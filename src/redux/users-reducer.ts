import {ResultCodesEnum} from "../api/api";
import {PhotosType, UserType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";

export type LocationType = {
    city: string
    country: string
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

let initialState = {
    users: [
    ] as UserType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as number[] //users ids
}

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW':
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case 'USERS/UNFOLLOW':
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'USERS/SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'USERS/SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
            }
        case 'USERS/SET_TOTAL_USERS_COUNT': {
            return {
                ...state, totalUsersCount: action.count
            }
        }
        case 'USERS/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

export const actions = {
    followSuccess: (userId: number) => ({type: 'USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'USERS/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}

type ThunkType = BaseThunkType<ActionsType>;

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize)
            dispatch(actions.toggleIsFetching(false))
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

const followUnfollowFlow = async (dispatch: Dispatch<ActionsType>, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)
        followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess)
    }
}

export default usersReducer;
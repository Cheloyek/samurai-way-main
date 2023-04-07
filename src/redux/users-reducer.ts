import {ResultCodesEnum} from "../api/api";
import {PhotosType, UserType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";

// export type UserType = {
//     id: number
//     photoUrl: string
//     followed: boolean
//     fullName: string
//     status: string
//     location: LocationType
// }
export type LocationType = {
    city: string
    country: string
}

export type InitialStateType = typeof initialState

// export type InitialStateType = {
//     users: Array<UserType>
//     pageSize: number
//     totalUsersCount: number
//     currentPage: number
//     isFetching: boolean
//     followingInProgress: Array<any>
// }

// export type ActionType = {
//     type: string
//     userId: any
//     users: Array<UserType>
//     currentPage: number
//     count: number
//     isFetching: boolean
// }

type ActionsType = InferActionsTypes<typeof actions>
    // | FollowSuccessActionType
    // | UnfollowSuccessActionType
    // | SetUsersActionType
    // | SetCurrentPageActionType
    // | SetTotalUsersCountActionType
    // | ToggleIsFetchingActionType
    // | ToggleIsFollowingProgressActionType

// type FollowSuccessActionType = {
//     type: typeof FOLLOW,
//     userId: number
// }
// type UnfollowSuccessActionType = {
//     type: typeof UNFOLLOW,
//     userId: number
// }
// type SetUsersActionType = {
//     type: typeof SET_USERS,
//     users: Array<UserType>
// }
// type SetCurrentPageActionType = {
//     type: typeof SET_CURRENT_PAGE,
//     currentPage: number
// }
// type SetTotalUsersCountActionType = {
//     type: typeof SET_TOTAL_USERS_COUNT,
//     count: number
// }
// type ToggleIsFetchingActionType = {
//     type: typeof TOGGLE_IS_FETCHING,
//     isFetching: boolean
// }
// type ToggleIsFollowingProgressActionType = {
//     type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
//     isFetching: boolean,
//     userId: number
// }

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

//значение по умолчанию
let initialState = {
    users: [
        // {id: 1, photoUrl: "https://mykaleidoscope.ru/uploads/posts/2022-08/1659724523_66-mykaleidoscope-ru-p-domik-v-gorakh-u-ozera-dizain-krasivo-foto-68.jpg" , followed: true, fullName: 'Dmitry', status: 'Good', location: {city: "Prague", country: "Czech"}},
        // {id: 2, photoUrl: "https://mykaleidoscope.ru/uploads/posts/2022-08/1659724523_66-mykaleidoscope-ru-p-domik-v-gorakh-u-ozera-dizain-krasivo-foto-68.jpg", followed: false, fullName: 'Dmitry', status: 'Good', location: {city: "Moscow", country: "Russia"}},
    ] as UserType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as number[] //users ids
}

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state, totalUsersCount: action.count
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
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
    followSuccess: (userId: number) => ({type: FOLLOW, userId} as const),
    unfollowSuccess: (userId: number) => ({type: UNFOLLOW, userId} as const),
    setUsers: (users: Array<UserType>) => ({type: SET_USERS, users} as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    } as const)
}


//thunk
export const requestUsers = (page: number, pageSize: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true)) //loading img
        dispatch(actions.setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize)
            dispatch(actions.toggleIsFetching(false)) //loading img
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
    dispatch(actions.toggleIsFollowingProgress(false, userId)) // disabled button
}

export const follow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)
        followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess);
    }
}

export const unfollow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess)
    }
}

export default usersReducer;
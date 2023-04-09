import {ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {usersAPI} from "../api/users-api";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

let initialState = {
    posts: [
        {id: 1, message: 'abc', likesCount: '0'},
        {id: 2, message: 'defg', likesCount: '26'},
    ] as Array<PostType>,
    profile: null as ProfileType | null, //
    status: '' as string | undefined, //
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/ADD-POST': {
            const newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: '0'
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }

        case 'PROFILE/SET_USER_PROFILE': {
            return {
                ...state, profile: action.profile
            }
        }
        case 'PROFILE/SET_STATUS': {
            return {
                ...state, status: action.status
            }
        }
        case 'PROFILE/DELETE_POST': {
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case 'PROFILE/SAVE_PHOTO_SUCCESS': {
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state
    }

}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'PROFILE/ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setStatus(status))
        }
    } catch (error: any) {
        console.error(error.message)
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodesEnum.Success) {
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('userId can`t be null')
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;
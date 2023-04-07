import {ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {usersAPI} from "../api/users-api";
import {profileAPI} from "../api/profile-api";

type ProfilePageType = typeof initialState
type AddPostActionCreatorActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}
export type ActionProfileReducerPropsType = {
    type: string
    newText?: string
    profile?: any
    status?: string
    body?: string
    newPostText?: any
    postId?: number
    photos?: any
}

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
    posts: [
        {id: 1, message: 'abc', likesCount: '0'},
        {id: 2, message: 'defg', likesCount: '26'},
    ] as Array<PostType>,
    profile: null as ProfileType | null, //
    status: '' as string | undefined, //
}

const profileReducer = (state = initialState, action: ActionProfileReducerPropsType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
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

        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state
    }

}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({
    type: ADD_POST,
    newPostText
})
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId: string) => async (dispatch: any) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getStatus = (userId: string) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setStatus(status))
        }
    } catch (error: any) {
        console.error(error.message)
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let data = await profileAPI.savePhoto(file)

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;
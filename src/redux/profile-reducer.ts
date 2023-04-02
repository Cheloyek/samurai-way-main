import {PostType} from "../components/Profile/MyPosts/MyPosts";
import {profileAPI, usersAPI} from "../api/api";


export type ProfilePageType = {
    posts: Array<PostType>
    // newPostText: string
    profile?: any
    status?: string
    // updateNewPostText?: (newText: string) => void
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

//значение по умолчанию
let initialState = {
    posts: [
        {id: 1, message: 'abc', likesCount: '0'},
        {id: 2, message: 'defg', likesCount: '26'},
    ],
    // newPostText: '', //текст в textarea
    profile: null,
    status: ''
}

const profileReducer = (state: ProfilePageType = initialState, action: ActionProfileReducerPropsType):ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: 5,
                //message: this._state.profilePage.newPostText,   // добавляет newPost при нажатии add post
                message: action.newPostText,   // добавляет newPost при нажатии add post
                likesCount: '0'
            }
            return {
                ...state,
                posts: [...state.posts, newPost], // stateCopy.posts.push(newPost)
              //  newPostText: ''                   // очищает input по нажатию add post
            }
            // stateCopy.posts = [...state.posts]
            // stateCopy.posts.push(newPost)// добавляет в stateCopy новый post
            // stateCopy.newPostText = ''// очищает input по нажатию add post
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
                ...state, profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state
    }

}

export const addPostActionCreator = (newPostText: any) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string) => ({type: SET_STATUS, status})
export const deletePost = (postId: number) => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos: any) => ({type: SAVE_PHOTO_SUCCESS, photos})
export const saveProfileSuccess = (profile: any) => {}
export const getUserProfile = (userId: string) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId)
    console.log(response.data,'data')
    dispatch(setUserProfile(response.data))

}

export const getStatus = (userId: string) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    console.log('getStatus', response.data)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: any) => async (dispatch: any) => {
    let response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        // dispatch(saveProfileSuccess(response.data.data.photos))
    }
}

export default profileReducer;
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
}

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST'

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

const profileReducer = (state: ProfilePageType = initialState, action: ActionProfileReducerPropsType) => {
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
                newPostText: ''                   // очищает input по нажатию add post
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
        default:                              // если ничего не подошло под условия
            return state
        }

}

export const addPostActionCreator = (newPostText: any) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string) => ({type: SET_STATUS, status})
export const deletePost = (postId: number) => ({type: DELETE_POST, postId})
export const getUserProfile = (userId: string) => (dispatch: any) => {
    console.log(userId)
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        })
}

export const getStatus = (userId: string) => (dispatch: any) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
        })
}

export const updateStatus = (status: string) => (dispatch: any) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}


export default profileReducer;
import {PostType} from "../components/Profile/MyPosts/MyPosts";
import {usersAPI} from "../api/api";


export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile?: any
    // updateNewPostText?: (newText: string) => void
}

export type ActionProfileReducerPropsType = {
    type: string
    newText: string
    profile: any
}

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

//значение по умолчанию
let initialState = {
    posts: [
        {id: 1, message: 'abc', likesCount: '0'},
        {id: 2, message: 'defg', likesCount: '26'},
    ],
    newPostText: '', //текст в textarea
    profile: null
}

const profileReducer = (state: ProfilePageType = initialState, action: ActionProfileReducerPropsType) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: 5,
                //message: this._state.profilePage.newPostText,   // добавляет newPost при нажатии add post
                message: state.newPostText,   // добавляет newPost при нажатии add post
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
        case UPDATE_NEW_POST_TEXT: {            // updateNewPostText - перерисовка при добавлении текста в textarea (без нажатия кнопки)
            return {
                ...state,
                newPostText: action.newText    // добавляет newText который ввели в textarea
            }
            // stateCopy.newPostText = action.newText// добавляет newText который ввели в textarea
        }
        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            }
        }
        default:                              // если ничего не подошло под условия
            return state
        }
    //заменили на case if else на switch case
    // if (action.type === ADD_POST) {
    //     const newPost = {
    //         id: 5,
    //         //message: this._state.profilePage.newPostText,   // добавляет newPost при нажатии add post
    //         message: state.newPostText,   // добавляет newPost при нажатии add post
    //         likesCount: '0'
    //     }
    //     state.posts.push(newPost)             // добавляет в state новый post
    //     state.newPostText = ''                // очищает input по нажатию add post
    // } else if (action.type === UPDATE_NEW_POST_TEXT) {          // updateNewPostText - перерисовка при добавлении текста в textarea (без нажатия кнопки)
    //     state.newPostText = action.newText    // добавляет newText который ввели в textarea
    // }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text})
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile})
export const getUserProfile = (userId: string) => (dispatch: any) => {
    usersAPI.getProfile(userId)
        .then(data => {
            dispatch(setUserProfile(data))
        })
}


export default profileReducer;
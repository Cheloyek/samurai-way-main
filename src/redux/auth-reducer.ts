import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";


export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}
export type LocationType = {
    city: string
    country: string
}

export type InitialStateType = {
        userId: number | null,
        login: string | null,
        email: string | null,
        isAuth: boolean
    // messages: Array<string>,
    // fieldsErrors: any,
    // resultCode: any,
    // isFetching?: boolean
}

// export type ActionProfileReducerPropsType = {
//     type: string
//     newText: string
// }

export type ActionType = {
    type: string
    payload: {
        id: number,
        login: string,
        email: string
    }
}

const SET_USER_DATA = 'SET_USER_DATA';
const UNFOLLOW = 'UNFOLLOW';

//значение по умолчанию
let initialState: InitialStateType = {
        // id:26584,
        userId: null,
        // login:"VladimirR",
        login: null,
        // email:"vladimir817vk@gmail.com",
        email: null,
        isAuth: false
    // messages:[],
    // fieldsErrors:[],
    // resultCode:0,
    // isFetching: false
}

const authReducer = (state: any = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                    }
        default:
            return state
        }

}


export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA, payload: {userId, login, email, isAuth}})

export const getAuthUserData = () => (dispatch: any) => {
    return authAPI.getMe()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data
                dispatch(setAuthUserData(id, login, email, true))
            }
        })
}

// export const getLoginUserData = () => {
//     loginAPI.getLogin()
//         .then(data => {
//             if (data.resultCode === 0)
//         })
// }

export const login = (email: string, password: any, rememberMe: boolean) => (dispatch: any) => {
    //передаем какую форму останавливаем, { эдемент для которого вывести: описание}
    // let action = stopSubmit('login', {email: 'Email is wrong'})
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                dispatch(stopSubmit('login', {_error: message}))
            }
        })
}

export const logOut = () => (dispatch: any) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}

export default authReducer;
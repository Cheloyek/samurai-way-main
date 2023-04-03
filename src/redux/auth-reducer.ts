import {authAPI, securityAPI} from "../api/api";
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
    isAuth: boolean,
    captchaUrl: string | null
}

// export type ActionProfileReducerPropsType = {
//     type: string
//     newText: string
// }

export type ActionType = {
    type: string
    payload: {
        userId: number
        login: string
        email: string
        isAuth: boolean
    }
}

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState: InitialStateType = {
    // id:26584,
    userId: null,
    // login:"VladimirR",
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}


export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA, payload: {userId, login, email, isAuth}
})

export const getCaptchaUrlSuccess = (captchaUrl: string | null) => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
})

export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.getMe()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, login, email, true))
    }
}

export const login = (email: string, password: any, rememberMe: boolean) => async (dispatch: any) => {
    //передаем какую форму останавливаем, { эдемент для которого вывести: описание}
    // let action = stopSubmit('login', {email: 'Email is wrong'})
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logOut = () => async (dispatch: any) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;
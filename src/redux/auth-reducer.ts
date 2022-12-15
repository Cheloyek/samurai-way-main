import {authAPI} from "../api/api";


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
    data:{
        id: number,
        login: string,
        email: string,
        isAuth: boolean
    },
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
    data: {
        id: number,
        login: string,
        email: string
    }
}

const SET_USER_DATA = 'SET_USER_DATA';
const UNFOLLOW = 'UNFOLLOW';

//значение по умолчанию
let initialState: InitialStateType = {
    data:{
        id:26584,
        login:"VladimirR",
        email:"vladimir817vk@gmail.com",
        isAuth: false
    },
    // messages:[],
    // fieldsErrors:[],
    // resultCode:0,
    // isFetching: false
}

const authReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
                    }
        default:
            return state
        }

}


export const setAuthUserData = (id: number, login: string, email: string, isAuth: boolean) => ({
    type: SET_USER_DATA, data: {id, login, email, isAuth}})

export const getAuthUserData = () => (dispatch: any) => {
    authAPI.getMe()
        .then(data => {
            if (data.resultCode === 0) {
                let {id, login, email} = data.data
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
    authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
}

export const logOut = () => (dispatch: any) => {
    authAPI.logOut()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(0, '', '', false))
            }
        })
}

export default authReducer;
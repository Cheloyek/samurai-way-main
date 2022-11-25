

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

export const setAuthUserData = (id: number, login: string, email: string) => ({type: SET_USER_DATA, data: {id, login, email}})

export default authReducer;
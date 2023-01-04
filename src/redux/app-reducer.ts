import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth-reducer";


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
        initialized: boolean
}

export type ActionType = {
    type: string
    payload: {
        id: number,
        login: string,
        email: string
    }
}

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
let initialState: InitialStateType = {
    initialized: false,
}

const appReducer = (state: any = initialState, action: ActionType) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
                    }
        default:
            return state
        }

}


export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then( () => {
        dispatch(initializedSuccess())
    })
}

export default appReducer;
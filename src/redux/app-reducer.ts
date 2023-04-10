import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

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
export type InitialStateType = typeof initialState
export type ActionType = {
    type: string
    payload: {
        id: number,
        login: string,
        email: string
    }
}
type ActionsType = InferActionsTypes<typeof actions>

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
                    }
        default:
            return state
        }

}

export const actions = {
    initializedSuccess: () => ({type: 'APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then( () => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer;

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
export type InitialStateType = typeof initialState
export type ActionType = {
    type: string
    payload: {
        id: number,
        login: string,
        email: string
    }
}
type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}

const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS';
let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action: ActionType): InitialStateType => {
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

export const actions = {
    initializedSuccess: () => ({type: INITIALIZED_SUCCESS})
}

// export const initializedSuccess = (): InitializedSuccessType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then( () => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer;
import {AppStateType} from "./redux-store";

export const authId = (state: AppStateType) => {
    return state.auth.userId
}
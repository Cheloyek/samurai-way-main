import {AppStateType} from "./redux-store";

export const chatStatus = (state: AppStateType) => {
    return state.chat.status
}
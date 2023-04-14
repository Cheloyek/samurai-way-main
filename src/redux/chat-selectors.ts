import {useSelector} from "react-redux";
import {AppStateType} from "./redux-store";


// export const chatStatus = useSelector((state: AppStateType) => state.chat.status)

export const chatStatus = (state: AppStateType) => {
    return state.chat.status
}
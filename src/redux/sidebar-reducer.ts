import {FriendType} from "./store";


export type StateSidebarType = {
    fiends: Array<FriendType>
}

let initialState = {}

const sidebarReducer = (state: any = initialState, action: any) => {
    return state
}


export default sidebarReducer;
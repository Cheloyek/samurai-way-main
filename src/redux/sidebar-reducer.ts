


export type StateSidebarType = {
    fiends: Array<FriendType>
}

export type FriendType = {
    id: number
    nameFriend: string
}

let initialState = {}

const sidebarReducer = (state: any = initialState, action: any) => {
    return state
}


export default sidebarReducer;
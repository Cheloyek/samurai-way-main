export type FriendType = {
    id: number
    nameFriend: string
}
type InitialStateType = typeof initialState
let initialState = {}

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state
}


export default sidebarReducer;
export type FriendType = {
    id: number
    nameFriend: string
}
type InitialStateType = typeof initialState
let initialState = {}

const sidebarReducer = (state = initialState): InitialStateType => {
    return state
}


export default sidebarReducer;
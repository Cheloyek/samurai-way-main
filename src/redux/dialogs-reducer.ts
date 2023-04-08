import {InferActionsTypes} from "./redux-store";

export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number,
    name: string,
    url?: string
}
// export type DialogPageType = {
//     messages: Array<MessageType>
//     dialogs: Array<DialogType>
// }
export type InitialStateType = typeof initialState
// export type ActionDialogsReducerPropsType = {
//     type: string
//     body: string
//     newMessageBody: any
// }
// type SendMessageCreatorActionType = {
//     type: typeof SEND_MESSAGE,
//     newMessageBody: string
// }
type ActionsType = InferActionsTypes<typeof actions>

let initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Ho'},
        {id: 3, message: 'Yo'},
    ] as MessageType[],
    dialogs: [
        {
            id: 1,
            name: 'Dimych',
            url: 'https://media.istockphoto.com/photos/abstract-curved-shapes-picture-id1340367001?b=1&k=20&m=1340367001&s=170667a&w=0&h=rEDszAkp7zRWyHBRPcIwFecc0QlbZNhc0sM62rjAa3U'
        },
        {id: 2, name: 'User 2'},
        {id: 3, name: 'User 3'},
        {id: 4, name: 'User 4'},
        {id: 5, name: 'User 5'},
        {id: 6, name: 'User 6'},
    ] as DialogType[],
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'DIALOGS/SEND-MESSAGE': {
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: body}]
            }
        }
        default:
            return state
    }
}

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'DIALOGS/SEND-MESSAGE', newMessageBody} as const)
}

// export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;
const SEND_MESSAGE = 'SEND-MESSAGE';

export type MessageType = {
    id: number
    message: string
}

export type DialogsType = {
    id: number,
    name: string,
    url?: string
}

export type DialogPageType = {
    messages: Array<MessageType>
    dialogs: Array<DialogsType>
}

export type ActionDialogsReducerPropsType = {
    type: string
    body: string
    newMessageBody: any
}

let initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Ho'},
        {id: 3, message: 'Yo'},
    ],
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
    ],
}

const dialogsReducer = (state: DialogPageType = initialState, action: ActionDialogsReducerPropsType) => {
    switch (action.type) {
        case SEND_MESSAGE: {
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

export const sendMessageCreator = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;
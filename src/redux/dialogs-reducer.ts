const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
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
    newMessageBody: string
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
    newMessageBody: '' //текст в textarea
}

// export type StatePropsType = {
//     newMessageBody: string
//     messages: Array<MessageType>
//     dialogs: any
// }

export type ActionDialogsReducerPropsType = {
    type: string
    body: string
}

const dialogsReducer = (state: DialogPageType = initialState, action: ActionDialogsReducerPropsType) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            return {
                ...state,
                newMessageBody: action.body}       // добавляет newMessage который ввели в textarea
        }
        case SEND_MESSAGE: {
            let body = state.newMessageBody
            return {
                ...state,
                newMessageBody: '',              // очищает input по нажатию send message
                messages: [...state.messages, {id: 4, message: body}] // stateCopy.messages.push({id: 4, message: body})
            }
        }
        default:
            return state
    }
    //заменили if else на switch case
    // if (action.type === UPDATE_NEW_MESSAGE_BODY) { //////////////////add3
    //     state.newMessageBody = action.body   //add4 добавляет newMessage который ввели в textarea
    // } else if (action.type === SEND_MESSAGE) { //////////////////add3
    //     let body = state.newMessageBody
    //     state.newMessageBody = ''            // очищает input по нажатию send message
    //     state.messages.push({id: 4, message: body})
    // }
    // return state
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE}) //add6
export const updateNewMessageBodyCreator = (body: string) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body}) //add6

export default dialogsReducer;
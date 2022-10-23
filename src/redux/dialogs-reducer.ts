const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

const dialogsReducer = (state: any, action: any) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body   //add4 добавляет newMessage который ввели в textarea
            return state;

        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.newMessageBody = ''            // очищает input по нажатию send message
            state.messages.push({id: 4, message: body})
            return state;

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
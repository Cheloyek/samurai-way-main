//переместили в метод объекта store
// let rerenderEntireTree = () => {
//     console.log('State changed') // будет заменено на subscribe при срабатывании замыкания
// }
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {RootStateType} from "../App";










export type ActionDispatchPropsType = {
    type: string
    body: string
    newText: string
}



export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: (_state: RootStateType) => void // ничего не принимает ничего не возвращает
    // addPost: () => void
    // updateNewPostText: (newText: string) => void
    // subscribe: (observer: () => void) => void
    subscribe: (observer: (state: any) => void) => void
    // updateNewMessageText: (newMessage: string) => void
    // addMessage: () => void
    dispatch: any
}

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'abc', likesCount: '0'},
                {id: 2, message: 'defg', likesCount: '26'},
            ],
            newPostText: '' //текст в textarea
        },
        dialogsPage: {
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
        },
        sidebar: {
            fiends: [
                {id: 1, nameFriend: 'friend1'},
                {id: 2, nameFriend: 'friend2'},
                {id: 3, nameFriend: 'friend3'},
            ]
        }
    },
    _callSubscriber() {
        console.log('State changed') // будет заменено на subscribe при срабатывании замыкания
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer  // паттерн будет искать объявление rerenderEntireTree, не найдет, выйдет наружу и обнаружит
        // let rerenderEntireTree - которой присвоит значение observer
    },

    // переместили в dispatch
    // addPost () {
    //     const newPost = {
    //         id: 5,
    //         message: this._state.profilePage.newPostText,   // добавляет newPost при нажатии add post
    //         likesCount: '0'
    //     }
    //     this._state.profilePage.posts.push(newPost)         // добавляет в state новый post
    //     this._state.profilePage.newPostText = ''            // очищает input по нажатию add post
    //     this._callSubscriber(this._state)                     // перерисовывает дерево
    // },
    // updateNewPostText (newText) {
    //     this._state.profilePage.newPostText = newText        // добавляет newText который ввели в textarea
    //     this._callSubscriber(this._state)                      // перерисовывает дерево
    // },
    // updateNewMessageText(newMessage) {
    //     this._state.dialogsPage.newMessageBody = newMessage  // добавляет newMessage который ввели в textarea
    //     this._callSubscriber(this._state)                      // перерисовывает дерево
    // },//////////////////////del1
    // addMessage() {
    //     const newMessage: MessageType = {
    //         id: 4,
    //         message: this._state.dialogsPage.newMessageBody,
    //     }
    //     this._state.dialogsPage.messages.push(newMessage)   // добавляет newMessage в messages
    //     this._state.dialogsPage.newMessageBody = ''         // очищает input по нажатию send message
    //     this._callSubscriber(this._state)                     // перерисовывает дерево
    // },///////////////////////del2

    // dispatch - функция отправки, диспатчить можно только объект (action)
    dispatch(action: ActionDispatchPropsType) { //action - объект, у которого обязательно есть свойство type

        //заменили на reducer
        // if (action.type === ADD_POST) {
        //     const newPost = {
        //         id: 5,
        //         message: this._state.profilePage.newPostText,   // добавляет newPost при нажатии add post
        //         likesCount: '0'
        //     }
        //     this._state.profilePage.posts.push(newPost)             // добавляет в state новый post
        //     this._state.profilePage.newPostText = ''                // очищает input по нажатию add post
        //     this._callSubscriber(this._state)                       // перерисовывает дерево
        // } else if (action.type === UPDATE_NEW_POST_TEXT) {          // updateNewPostText - перерисовка при добавлении текста в textarea (без нажатия кнопки)
        //     this._state.profilePage.newPostText = action.newText    // добавляет newText который ввели в textarea
        //     this._callSubscriber(this._state)                       // перерисовывает дерево
        // } else if (action.type === UPDATE_NEW_MESSAGE_BODY) { //////////////////add3
        //     this._state.dialogsPage.newMessageBody = action.body   //add4 добавляет newMessage который ввели в textarea
        //     this._callSubscriber(this._state)                      //add5 перерисовывает дерево
        // } else if (action.type === SEND_MESSAGE) { //////////////////add3
        //     let body = this._state.dialogsPage.newMessageBody
        //     this._state.dialogsPage.newMessageBody = ''            // очищает input по нажатию send message
        //     this._state.dialogsPage.messages.push( {id: 4, message: body} )
        //     this._callSubscriber(this._state)                      // перерисовывает дерево

        // profileReducer(this._state.profilePage, action)
        this._state.profilePage = profileReducer(this._state.profilePage, action) // state обновился. Если action не для reducer, то вернет неизмененный this._state.profilePage
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state)                      // перерисовывает дерево
        // }
    },

    // reducer - чистая функция, которая принимает нужную часть state, action (чтобы понять что изменять), применяет его и возвращает измененный state

}

// export const addPostActionCreator = () => ({type: ADD_POST})
//
// export const updateNewPostTextActionCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text})

// export const sendMessageCreator = () => ({type: SEND_MESSAGE}) //add6
// export const updateNewMessageBodyCreator = (body: string) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body}) //add6



export default store
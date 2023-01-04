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
    profile: any
    status: string
    newMessageBody: any
    newPostText: any
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

    dispatch(action: ActionDispatchPropsType) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state)
    },
}
// window.store = store
export default store

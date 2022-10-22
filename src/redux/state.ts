//переместили в метод объекта store
// let rerenderEntireTree = () => {
//     console.log('State changed') // будет заменено на subscribe при срабатывании замыкания
// }
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';


export type PostType = {
    id: number
    message: string
    likesCount: string
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    // updateNewPostText?: (newText: string) => void
}

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
    newMessageText: string
}

type FriendType = {
    id: number
    nameFriend: string
}

type SidebarType = {
    fiends: Array<FriendType>
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: (_state: RootStateType) => void // ничего не принимает ничего не возвращает
    // addPost: () => void
    // updateNewPostText: (newText: string) => void
    // subscribe: (observer: () => void) => void
    subscribe: (observer: (state: any) => void) => void
    updateNewMessageText: (newMessage: string) => void
    addMessage: () => void
    dispatch: any
}

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'abc', likesCount: '0'},
                {id: 2, message: 'defg', likesCount: '26'},
            ],
            newPostText: 'sdsd'
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Ho'},
                {id: 3, message: 'Yo'},
            ],
            dialogs: [
                {id: 1, name: 'Dimych', url: 'https://media.istockphoto.com/photos/abstract-curved-shapes-picture-id1340367001?b=1&k=20&m=1340367001&s=170667a&w=0&h=rEDszAkp7zRWyHBRPcIwFecc0QlbZNhc0sM62rjAa3U'},
                {id: 2, name: 'User 2'},
                {id: 3, name: 'User 3'},
                {id: 4, name: 'User 4'},
                {id: 5, name: 'User 5'},
                {id: 6, name: 'User 6'},
            ],
            newMessageText: 'New Message'
        },
        sidebar: {
            fiends: [
                {id:1, nameFriend: 'friend1'},
                {id:2, nameFriend: 'friend2'},
                {id:3, nameFriend: 'friend3'},
            ]
        }
    },
    _callSubscriber () {
        console.log('State changed') // будет заменено на subscribe при срабатывании замыкания
    },

    getState () {
        return this._state
    },
    subscribe (observer) {
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
    updateNewMessageText (newMessage) {
        this._state.dialogsPage.newMessageText = newMessage  // добавляет newMessage который ввели в textarea
        this._callSubscriber(this._state)                      // перерисовывает дерево
    },//////////////////////1
    addMessage () {
        const newMessage: MessageType = {
            id: 4,
            message: this._state.dialogsPage.newMessageText,
        }
        this._state.dialogsPage.messages.push(newMessage)   // добавляет newMessage в messages
        this._state.dialogsPage.newMessageText = ''         // очищает input по нажатию send message
        this._callSubscriber(this._state)                     // перерисовывает дерево
    },///////////////////////2
    dispatch (action: any) { //action - объект, у которого обязательно есть свойство type
        if (action.type === 'ADD-POST') {
            const newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,   // добавляет newPost при нажатии add post
                likesCount: '0'
            }
            this._state.profilePage.posts.push(newPost)         // добавляет в state новый post
            this._state.profilePage.newPostText = ''            // очищает input по нажатию add post
            this._callSubscriber(this._state)                     // перерисовывает дерево
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText        // добавляет newText который ввели в textarea
            this._callSubscriber(this._state)                      // перерисовывает дерево
        }
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text})

// переместили в store
// let state: RootStateType = {
//     profilePage: {
//         posts: [
//             {id: 1, message: 'abc', likesCount: '0'},
//             {id: 2, message: 'defg', likesCount: '26'},
//         ],
//         newPostText: 'sdsd'
//     },
//     dialogsPage: {
//         messages: [
//             {id: 1, message: 'Hi'},
//             {id: 2, message: 'Ho'},
//             {id: 3, message: 'Yo'},
//         ],
//         dialogs: [
//             {id: 1, name: 'Dimych', url: 'https://media.istockphoto.com/photos/abstract-curved-shapes-picture-id1340367001?b=1&k=20&m=1340367001&s=170667a&w=0&h=rEDszAkp7zRWyHBRPcIwFecc0QlbZNhc0sM62rjAa3U'},
//             {id: 2, name: 'User 2'},
//             {id: 3, name: 'User 3'},
//             {id: 4, name: 'User 4'},
//             {id: 5, name: 'User 5'},
//             {id: 6, name: 'User 6'},
//         ],
//         newMessageText: 'New Message'
//     },
//     sidebar: {
//         fiends: [
//             {id:1, nameFriend: 'friend1'},
//             {id:2, nameFriend: 'friend2'},
//             {id:3, nameFriend: 'friend3'},
//         ]
//     }
// }

// addPost - перерисовка при добавлении newPost, в функцию передали state для index и render, переместили в метод объекта store
// export const addPost = () => {
//     const newPost: PostType = {
//         id: 5,
//         message: state.profilePage.newPostText,   // добавляет newPost при нажатии add post
//         likesCount: '0'
//     }
//     state.profilePage.posts.push(newPost)         // добавляет в state новый post
//     state.profilePage.newPostText = ''            // очищает input по нажатию add post
//     rerenderEntireTree(state)                     // перерисовывает дерево
//
// }

//переместили в store
// export const addMessage = () => {
//     const newMessage: MessageType = {
//         id: 4,
//         message: state.dialogsPage.newMessageText,
//     }
//     state.dialogsPage.messages.push(newMessage)   // добавляет newMessage в messages
//     state.dialogsPage.newMessageText = ''         // очищает input по нажатию send message
//     rerenderEntireTree(state)                     // перерисовывает дерево
// }

// updateNewPostText - перерисовка при добавлении текста в textarea (без нажатия кнопки), переместили в метод store
// export const updateNewPostText = (newText: any) => {
//     state.profilePage.newPostText = newText        // добавляет newText который ввели в textarea
//     rerenderEntireTree(state)                      // перерисовывает дерево
// }

//переместили в store
// export const updateNewMessageText = (newMessage: any) => {
//     state.dialogsPage.newMessageText = newMessage  // добавляет newMessage который ввели в textarea
//     rerenderEntireTree(state)                      // перерисовывает дерево
// }

//переместили в метод store
// export const subscribe = (observer: () => void) => {
//     rerenderEntireTree = observer  // паттерн будет искать объявление rerenderEntireTree, не найдет, выйдет наружу и обнаружит
//         // let rerenderEntireTree - которой присвоит значение observer
// }


export default store
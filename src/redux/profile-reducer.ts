

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const profileReducer = (state: any, action: any) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 5,
                //message: this._state.profilePage.newPostText,   // добавляет newPost при нажатии add post
                message: state.newPostText,   // добавляет newPost при нажатии add post
                likesCount: '0'
            }
            state.posts.push(newPost)         // добавляет в state новый post
            state.newPostText = ''            // очищает input по нажатию add post
            return state;

        case UPDATE_NEW_POST_TEXT:            // updateNewPostText - перерисовка при добавлении текста в textarea (без нажатия кнопки)
            state.newPostText = action.newText// добавляет newText который ввели в textarea
            return state;

        default:                              // если ничего не подошло под условия
            return state
    }
    //заменили на case if else на switch case
    // if (action.type === ADD_POST) {
    //     const newPost = {
    //         id: 5,
    //         //message: this._state.profilePage.newPostText,   // добавляет newPost при нажатии add post
    //         message: state.newPostText,   // добавляет newPost при нажатии add post
    //         likesCount: '0'
    //     }
    //     state.posts.push(newPost)             // добавляет в state новый post
    //     state.newPostText = ''                // очищает input по нажатию add post
    // } else if (action.type === UPDATE_NEW_POST_TEXT) {          // updateNewPostText - перерисовка при добавлении текста в textarea (без нажатия кнопки)
    //     state.newPostText = action.newText    // добавляет newText который ввели в textarea
    // }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text})

export default profileReducer;
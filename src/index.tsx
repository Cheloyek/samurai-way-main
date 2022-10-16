import React from 'react';
import './index.css';
import state, {subscribe} from "./redux/state";

//переместили в state
// let dialogs = [
//     {id: 1, name: 'Dimych'},
//     {id: 2, name: 'User 2'},
//     {id: 3, name: 'User 3'},
//     {id: 4, name: 'User 4'},
//     {id: 5, name: 'User 5'},
//     {id: 6, name: 'User 6'},
// ]
// let messages = [
//     {id: 1, message: 'Hi'},
//     {id: 2, message: 'Ho'},
//     {id: 3, message: 'Yo'},
// ]
// передаются в <App posts={posts}/> -> app -> Profile -> MyPosts
// let posts = [
//     {id: 1, message: 'abc', likesCount: '0'},
//     {id: 2, message: 'defg', likesCount: '26'},
// ]


//переместили в render
// ReactDOM.render(
//     <App state={state} addPost={addPost}/>,
//   document.getElementById('root')
// );

// возвратили из render
import ReactDOM from "react-dom";
import App from "./App";

//убрали из-за цикличности между render и state, state передан через props
//import state from "./redux/state";

import {
    addMessage,
    addPost,
    PostType,
    RootStateType,
    updateNewMessageText,
    updateNewPostText
} from "./redux/state";

// type renderPropsType = {
//     state: RootStateType
//     addPost: object
//     updateNewPostText: (postMessage: any)=> void
// }

//функция перерисовывает страницу при изменении. Через props передается state
const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        // в app передается state, addPost и updateNewPostText из state.ts
        <App state={state}
             addPost={addPost}
             updateNewPostText={updateNewPostText}
             updateNewMessageText={updateNewMessageText}
             addMessage={addMessage}
        />,
        document.getElementById('root')
    );
}

subscribe(rerenderEntireTree) // через эту функцию передали в state

rerenderEntireTree(state)
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {addPost} from './redux/state'
import {rerenderEntireTree} from "./render";

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


// ReactDOM.render(
//     <App state={state} addPost={addPost}/>,
//   document.getElementById('root')
// );

rerenderEntireTree()
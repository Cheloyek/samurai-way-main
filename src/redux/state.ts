import * as url from "url";
import React from "react";
import {rerenderEntireTree} from "../render";

export type PostType = {
    id: number
    message: string
    likesCount: string
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
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


let state: RootStateType = {
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
    },
    sidebar: {
        fiends: [
            {id:1, nameFriend: 'friend1'},
            {id:2, nameFriend: 'friend2'},
            {id:3, nameFriend: 'friend3'},
        ]
    }
}

export let addPost = (postMessage: string) => {
    debugger
    const newPost: PostType = {
        id: 5,
        message: postMessage,
        likesCount: '0'
    }
    //добавляет в state новый post
    state.profilePage.posts.push(newPost)

    //функция перерисовывает страницу при добавлении newPost, в функцию передали state для index и render
    rerenderEntireTree(state)

}

export default state
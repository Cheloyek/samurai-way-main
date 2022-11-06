import React from "react";
import {PostType} from "../../../redux/store";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

//4
export type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: {type: string}) => void
    addPost: any
    updateNewPostText: string
}

// props из app -> profile передается в MyPosts
// заменили на connect
// const MyPostsContainer = (props: any) => {
//     // debugger
//     let state = props.store.getState()
//     //callback функция при нажатии на кнопку Add post, обращается к newPostElement считывает current.value
//     const addPost = () => {
//         props.store.dispatch(addPostActionCreator())
//     }
//
//     // срабатывает когда пытаемся изменить textarea
//     let onPostChange = (text: string) => {
//         let action = updateNewPostTextActionCreator(text)
//         props.store.dispatch(action)
//     }
//
//     return (<MyPosts
//         posts={state.profilePage.posts}
//         addPost={addPost}
//         updateNewPostText={onPostChange}
//         newPostText={state.profilePage.newPostText}/>)
// }

//выполняется при каждом изменении в state и сравнивается содержимое, если что-то в state изменилось, кроме указанного в функции
//то не перерисовывает
let mapStateToProps = (state: any) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        updateNewPostText: (text: any) => {
            let action = updateNewPostTextActionCreator(text)
            dispatch(action)
        }
    }
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
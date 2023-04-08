import React from "react";
import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {PostType} from "../../../types/types";

//4
export type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: {type: string}) => void
    addPost: any
    updateNewPostText: string
}

let mapStateToProps = (state: any) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostText: any) => {
            dispatch(actions.addPostActionCreator(newPostText))
        },
    }
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
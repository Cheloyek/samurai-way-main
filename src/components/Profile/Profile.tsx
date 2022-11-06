import React, {Dispatch} from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/store";
import {AnyAction} from "redux";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: Dispatch<AnyAction>
    // addPost:  (postMessage: string) => void
    // updateNewPostText: (newText: any) => void
}

const Profile = (props: any) => {
    // debugger
    //вынесли в app, получили из app через props, передали через props.posts в MyPosts
// let posts = [
//     {id: 1, message: 'abc', likesCount: '0'},
//     {id: 2, message: 'defg', likesCount: '26'},
// ]
    return (
        <div>
                <ProfileInfo/>
                <MyPostsContainer store={props.store}/>
        </div>
    )
}

export default Profile;
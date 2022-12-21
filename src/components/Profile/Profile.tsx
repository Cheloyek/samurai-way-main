import React, {Dispatch} from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {AnyAction} from "redux";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfilePageType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: Dispatch<AnyAction>
    // addPost:  (postMessage: string) => void
    // updateNewPostText: (newText: any) => void
}

const Profile = (props: any) => {
    //вынесли в app, получили из app через props, передали через props.posts в MyPosts
// let posts = [
//     {id: 1, message: 'abc', likesCount: '0'},
//     {id: 2, message: 'defg', likesCount: '26'},
// ]
    return (
        <div>
                <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
                <MyPostsContainer store={props.store}/>
        </div>
    )
}

export default Profile;
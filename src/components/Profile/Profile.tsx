import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostType, ProfilePageType} from "../../redux/state";

type ProfilePropsType = {
    profilePage: ProfilePageType
    addPost:  (postMessage: string)=> void
}

const Profile = (props: ProfilePropsType) => {
    //вынесли в app, получили из app через props, передали через props.posts в MyPosts
// let posts = [
//     {id: 1, message: 'abc', likesCount: '0'},
//     {id: 2, message: 'defg', likesCount: '26'},
// ]
    return (
        <div>
                <ProfileInfo/>
                <MyPosts                                        // передает posts, newPostText, addPost в MyPost
                    posts={props.profilePage.posts}             // получает из state
                    newPostText={props.profilePage.newPostText} // получает из state
                    addPost={props.addPost}                     // получает из state
                />
        </div>
    )
}

export default Profile;
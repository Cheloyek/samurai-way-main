import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type ProfilePropsType = {
    profilePage: ProfilePageType
    addPost:  (postMessage: string) => void
    updateNewPostText: (newText: any) => void
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
                <MyPosts  // получает props из state передает posts, newPostText, addPost, updateNewPostText в MyPost
                    posts={props.profilePage.posts}
                    newPostText={props.profilePage.newPostText}
                    addPost={props.addPost}
                    updateNewPostText={props.updateNewPostText}
                />
        </div>
    )
}

export default Profile;
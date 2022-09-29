import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props: {state:{ posts: any; }}) => {
    //вынесли в app, получили из app через props, передали через props.posts в MyPosts
// let posts = [
//     {id: 1, message: 'abc', likesCount: '0'},
//     {id: 2, message: 'defg', likesCount: '26'},
// ]
    return (
        <div>
                <ProfileInfo/>
                <MyPosts posts={props.state.posts}/>
        </div>
    )
}

export default Profile;
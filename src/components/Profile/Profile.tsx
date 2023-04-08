import React, {Dispatch} from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {AnyAction} from "redux";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {InitialStateType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    isOwner: boolean,
    profile: any,
    status: any,
    updateStatus: any,
    savePhoto: any
    saveProfile: any
    // store?: any
}

const Profile = (props: ProfilePropsType) => {
    //вынесли в app, получили из app через props, передали через props.posts в MyPosts
// let posts = [
//     {id: 1, message: 'abc', likesCount: '0'},
//     {id: 2, message: 'defg', likesCount: '26'},
// ]
    return (
        <div>
                <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} saveProfile={props.saveProfile} savePhoto={props.savePhoto}/>
                {/*<MyPostsContainer store={props.store}/>*/}
                <MyPostsContainer/>
        </div>
    )
}

export default Profile;
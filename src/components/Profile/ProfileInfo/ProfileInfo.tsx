import React from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userImg from './../../../assets/images/user.png'

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}:any) => {
    if (profile === null) {
        return <Preloader/>
    }

    const onProfilePhotoSelected = (e: any) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img
                    src="https://media.istockphoto.com/photos/abstract-curved-shapes-picture-id1340367001?b=1&k=20&m=1340367001&s=170667a&w=0&h=rEDszAkp7zRWyHBRPcIwFecc0QlbZNhc0sM62rjAa3U="
                    alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                <div>
                    <img src={profile.photos.small || userImg} style={{width: "100px", height: "100px"}}/>
                    {isOwner && <input type={"file"} onChange={onProfilePhotoSelected}/>}
                </div>
                <div>fullName: {profile.fullName}</div>
                <div>description: {profile.aboutMe}</div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;
import React from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props: any) => {
    if (!props.profile) {
        return <Preloader/>
    } else
    return (
        <div>
            <div>
                <img
                    src="https://media.istockphoto.com/photos/abstract-curved-shapes-picture-id1340367001?b=1&k=20&m=1340367001&s=170667a&w=0&h=rEDszAkp7zRWyHBRPcIwFecc0QlbZNhc0sM62rjAa3U="
                    alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                <div>
                    avatar: <img src={props.profile.photos.small}/>
                </div>
                <div>fullName: {props.profile.fullName}</div>
                <div>description: {props.profile.aboutMe}</div>
                <ProfileStatus status={'status'}/>
            </div>
        </div>
    )
}

export default ProfileInfo;
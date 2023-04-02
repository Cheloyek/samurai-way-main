import React, {useState} from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userImg from './../../../assets/images/user.png'
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: any) => {
    const [editMode, setEditMode] = useState(false)
    if (profile === null) {
        return <Preloader/>
    }

    const onProfilePhotoSelected = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: any) => {
        console.log(formData)
        saveProfile(formData)
    }

    return (
        <div>
            <div>
                {/*<img*/}
                {/*    src="https://media.istockphoto.com/photos/abstract-curved-shapes-picture-id1340367001?b=1&k=20&m=1340367001&s=170667a&w=0&h=rEDszAkp7zRWyHBRPcIwFecc0QlbZNhc0sM62rjAa3U="*/}
                {/*    alt=""/>*/}
            </div>
            <div>
                <img src={profile.photos.small || userImg} style={{width: "100px", height: "100px"}}/>
                {isOwner && <input type={"file"} onChange={onProfilePhotoSelected}/>}
                {editMode
                    ? <ProfileDataForm
                        //@ts-ignore
                        profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} changeMode={() => {setEditMode(true)}}/>
                }
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

type ProfileDataType = {
    profile: any,
    isOwner: boolean,
    changeMode: any
}

const ProfileData = ({profile, isOwner, changeMode}: ProfileDataType) => {
    return (
        <div className={s.descriptionBlock}>
            {isOwner && <div>
                <button onClick={changeMode}>edit</button>
            </div>}
            <div>
                fullName: {profile.fullName}
            </div>
            <div>
                description: {profile.aboutMe}
            </div>
            <div>
                looking for a job: {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {profile.lookingForAJob &&
                <div>skills: {profile.lookingForAJobDescription}</div>
            }
            <div>
                about me: {profile.aboutMe}
            </div>

            <div>contacts: {Object.keys(profile.contacts).map(key => {
                return <Contact contactTitle={key} contactValue={profile.contacts[key]}/>
            })}</div>
        </div>
    )
}

const Contact = ({contactTitle, contactValue}: any) => {
    return <div>{contactTitle}: {contactValue}</div>
}

export default ProfileInfo;
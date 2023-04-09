import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userImg from './../../../assets/images/user.png'
import {ContactsType, ProfileType} from "../../../types/types";
import ProfileDataForm from "./ProfileDataForm";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: any
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type ProfileDataType = {
    profile: ProfileType,
    isOwner: boolean,
    changeMode: () => void
}
type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader/>
    }

    const onProfilePhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
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
                        profile={profile} initialValues={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} changeMode={() => {
                        setEditMode(true)
                    }}/>
                }
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, changeMode}) => {
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
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
            })}</div>
        </div>
    )
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div>{contactTitle}: {contactValue}</div>
}

export default ProfileInfo;
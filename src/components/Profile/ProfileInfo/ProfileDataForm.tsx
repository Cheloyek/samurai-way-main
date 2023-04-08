import React from "react";
import s from "./ProfileInfo.module.css";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormsControls.module.css";
import {ProfileType} from "../../../types/types";
import {LoginFormDataType} from "../../login/Login";

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>
        }
            <div>
                fullName: {createField<ProfileTypeKeys>('Full name', 'fullName', [], Input)}
            </div>
            <div>
                looking for a job: {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                Skills:{createField<ProfileTypeKeys>('Skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
        <div>
            about me:{createField<ProfileTypeKeys>('about me', 'aboutMe', [], Textarea)}
        </div>
            <div>contacts: {Object.keys(profile.contacts).map(key => {
                return <div key={key}>{key}: {createField(key, 'contacts.' + key, [], Input)}</div>
            })}</div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm
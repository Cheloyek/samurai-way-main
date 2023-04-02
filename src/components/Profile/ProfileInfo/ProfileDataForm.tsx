import React from "react";
import s from "./ProfileInfo.module.css";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const ProfileDataForm = (handleSubmit: any, profile: any) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
            <div>
                fullName: {createField('Full name', 'fullName', [], Input)}
            </div>
            <div>
                looking for a job: {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                Skills:{createField('Skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
        <div>
            about me:{createField('about me', 'about me', [], Textarea)}
        </div>
            {/*<div>contacts: {Object.keys(profile.contacts).map(key => {*/}
            {/*    return <Contact contactTitle={key} contactValue={profile.contacts[key]}/>*/}
            {/*})}</div>*/}
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm
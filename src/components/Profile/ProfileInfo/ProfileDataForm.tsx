import React from "react";
import s from "./ProfileInfo.module.css";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({onSubmit, profile, error}: any) => {
    return <form onSubmit={onSubmit}>
        <div><button>save</button></div>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>
        }
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
            <div>contacts: {Object.keys(profile.contacts).map(key => {
                return <div key={key}>{key}: {createField(key, 'contacts' + key, [], Input)}</div>
            })}</div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import s from "./MyPosts.module.css";
import React from "react";
import {LoginFormDataType, LoginFormValuesTypeKeys} from "../../login/Login";
import {Button} from "antd";

type PropsType = {

}
export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const maxLength10 = maxLengthCreator(10)

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>('Post message', "newPostText", [required, maxLength10], Textarea)}
            </div>
            <div>
                {/*<Button className={s.button}>Add post</Button>*/}
                <button className={s.button}>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({
    form: 'profile-add-post'
})(AddNewPostForm)
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import React from "react";
import {NewMessageFormValuesType} from "../Dialogs";

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const maxLength300 = maxLengthCreator(300)

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>('Enter your message', "newMessageBody", [required, maxLength300], Textarea)}
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}

export default reduxForm<NewMessageFormValuesType>({
    form: 'dialog-add-message-form'
})(AddMessageForm)
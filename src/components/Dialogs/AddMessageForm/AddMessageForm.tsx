import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import React from "react";

const maxLength300 = maxLengthCreator(300)

const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {/*<Field placeholder={'Enter your message'} name={'newMessageBody'} component={'textarea'}/>*/}
                <Field placeholder={'Enter your message'} component={Textarea} validate={[required, maxLength300]} name={'newMessageBody'}/>
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'dialog-add-message-form'
})(AddMessageForm)
import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {InitialStateType, MessageType} from "../../redux/dialogs-reducer";
import AddMessageForm from "./AddMessageForm/AddMessageForm";

type OwnPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}
export type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<OwnPropsType> = (props) => {
    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map((d: any) => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages.map((m: MessageType) => <Message message={m.message} key={m.id}/>)

    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}></div>
            <div>{messagesElements}</div>
            <AddMessageForm onSubmit={addNewMessage}/>
        </div>
    )
}

export default Dialogs
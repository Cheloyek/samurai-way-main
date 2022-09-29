import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";

const Dialogs = (props: any) => {

    // вынесли в index
    // let dialogs = [
    //     {id: 1, name: 'Dimych'},
    //     {id: 2, name: 'User 2'},
    //     {id: 3, name: 'User 3'},
    //     {id: 4, name: 'User 4'},
    //     {id: 5, name: 'User 5'},
    //     {id: 6, name: 'User 6'},
    // ]
    //
    // let messages = [
    //     {id: 1, message: 'Hi'},
    //     {id: 2, message: 'Ho'},
    //     {id: 3, message: 'Yo'},
    // ]

    let dialogsElements = props.state.dialogs.map((d: { name: any; id: any; }) => <DialogItem name={d.name} id={d.id}/>)
        // [
        // <DialogItem name={dialogs[0].name} id={dialogs[0].id}/>,
        //     <DialogItem name={dialogs[1].name} id={dialogs[1].id}/>,
        //     <DialogItem name={dialogs[2].name} id={dialogs[2].id}/>,
        //     <DialogItem name={dialogs[3].name} id={dialogs[3].id}/>,
        //     <DialogItem name={dialogs[4].name} id={dialogs[4].id}/>,
        //     <DialogItem name={dialogs[5].name} id={dialogs[5].id}/>,
        // ]
        // создает массив

    let messagesElements = props.state.messages.map((m: { message: any; }) => <Message message={m.message}/>)
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}

            </div>
            <div className={s.messages}>
                {/*<Message message={messages[0].message}/>*/}
                {/*<Message message={messages[1].message}/>*/}
                {/*<Message message={messages[2].message}/>*/}
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs
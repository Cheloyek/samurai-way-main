import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {StoreType} from "../../redux/store";
import {MessageType, sendMessageCreator} from "../../redux/dialogs-reducer";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import AddMessageForm from "./AddMessageForm/AddMessageForm";

type DialogsPropsType = {
    store: StoreType
    // state: DialogPageType
    // updateNewMessageText: (newMessage: any) => void
    // addMessage: (newMessageText:string) => void
    // dispatch: any
}


function AddMessageFormRedux(props: { onSubmit: (values: any) => void }) {
    return null;
}

//2
const Dialogs = (props: any) => {
    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map((d: any) => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages.map((m: MessageType) => <Message message={m.message} key={m.id}/>)
    //Ref - ссылка на любой элемент, в данном случае создание ссылки на элемент textarea
    // let newMessageElement = React.createRef<HTMLTextAreaElement>()
    //функция при нажатии на кнопку send message
    // const onSendMessageClick = () => {
    //     // если ссылки еще нет, то она ссылается ни на что, current? - если ссылка null,
    //     // то зафиксирует null или undefined и не будет пытаться искать значение value
    //     // let text = newMessageElement.current?.value
    //     // props.addMessage('')
    //     props.sendMessage()
    //
    // }
    // let onNewMessageChange = (e: any) => {
    //     // let textMessage = newMessageElement.current?.value      // текст сообщения который вводится в textarea
    //     let body = e.target.value
    //     // props.updateNewMessageText(textMessage)
    //     // @ts-ignore
    //     props.updateNewMessageBody(body)
    // }
    // if (props.isAuth === false) return <Redirect to={'/login'} />
    // if (!props.isAuth) {
    //     return <Redirect to={'/login'} />
    // }
    // alert(props.isAuth)

    let addNewMessage = (values: any) => {
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
            {/*<div>*/}
            {/*    <button onClick={onSendMessageClick}>Send message</button>*/}
            {/*</div>*/}
        </div>
    )
    // <div className={s.dialogs}>
    //     <div className={s.dialogsItems}>
    //         {dialogsElements}
    //     </div>
    //     <div className={s.messages}>
    //         {/*<Message message={messages[0].message}/>*/}
    //         {/*<Message message={messages[1].message}/>*/}
    //         {/*<Message message={messages[2].message}/>*/}
    //         <div>{messagesElements}</div>
    //         <div>
    //                 <textarea onChange={onNewMessageChange}
    //                           placeholder='Enter your message'
    //                     // ref={newMessageElement}
    //                           value={newMessageBody}></textarea>
    //         </div>
    //         <div>
    //             <button onClick={onSendMessageClick}>Send message</button>
    //         </div>
    //     </div>
    //
    // </div>
    {/*)*/
    }
    {/*}*/
    }
}


export default Dialogs

// ДО ИЗМЕНЕНИЯ КОД//////////////////////////////////////////////////////////////////////////
// import React from "react";
// import s from './Dialogs.module.css'
// import DialogItem from "./DialogItem/DialogsItem";
// import Message from "./Message/Message";
// import
//     {
//         DialogPageType
//     }
// from "../../redux/state";
//
// type DialogsPropsType =
//     {
//     state: DialogPageType
// }
//
// const Dialogs = (props: DialogsPropsType) => {
//
//     //Ref - ссылка на любой элемент, в данном случае создание ссылки на элемент textarea
//     let newMessageElement = React.createRef<HTMLTextAreaElement>()
//     //функция при нажатии на кнопку send message
//     const addMessage = () => {
//         // если ссылки еще нет, то она ссылается ни на что, current? - если ссылка null,
//         // то зафиксирует null или undefined и не будет пытаться искать значение value
//         let text = newMessageElement.current?.value
//         alert(text)
//     }
//
//     // вынесли в index
//     // let dialogs = [
//     //     {id: 1, name: 'Dimych'},
//     //     {id: 2, name: 'User 2'},
//     //     {id: 3, name: 'User 3'},
//     //     {id: 4, name: 'User 4'},
//     //     {id: 5, name: 'User 5'},
//     //     {id: 6, name: 'User 6'},
//     // ]
//     //
//     // let messages = [
//     //     {id: 1, message: 'Hi'},
//     //     {id: 2, message: 'Ho'},
//     //     {id: 3, message: 'Yo'},
//     // ]
//
//     let dialogsElements = props.state.dialogs.map((d) => <DialogItem name={d.name} id={d.id}/>)
//     // [
//     // <DialogItem name={dialogs[0].name} id={dialogs[0].id}/>,
//     //     <DialogItem name={dialogs[1].name} id={dialogs[1].id}/>,
//     //     <DialogItem name={dialogs[2].name} id={dialogs[2].id}/>,
//     //     <DialogItem name={dialogs[3].name} id={dialogs[3].id}/>,
//     //     <DialogItem name={dialogs[4].name} id={dialogs[4].id}/>,
//     //     <DialogItem name={dialogs[5].name} id={dialogs[5].id}/>,
//     // ]
//     // создает массив
//
//     let messagesElements = props.state.messages.map((m) => <Message message={m.message}/>)
//     return (
//         <div className={s.dialogs}>
//             <div className={s.dialogsItems}>
//                 {dialogsElements}
//
//             </div>
//             <div className={s.messages}>
//
//                 {/*<Message message={messages[0].message}/>*/}
//                 {/*<Message message={messages[1].message}/>*/}
//                 {/*<Message message={messages[2].message}/>*/}
//
//                 {messagesElements}
//                 <textarea ref={newMessageElement}></textarea>
//                 <div>
//                     <button onClick={addMessage}>Send message</button>
//                 </div>
//             </div>
//
//         </div>
//     )
// }
//
// export default Dialogs
import React from "react";
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";


// props id name <NavLink to='/dialogs/user2'>User 2</NavLink>
const DialogItem = (props:any) => {
    let path = '/dialogs/' + props.id

    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}

//props message <div className={s.message}>Hi</div> change to <NavLink to={path}>{props.name}</NavLink>
const Message = (props:any) => {
    return <div className={s.message}>{props.message}</div>
}


const Dialogs =(props:any) => {
    return(
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name='Dimych' id='1'/>
                    <DialogItem name='User 2' id='2'/>
                    <DialogItem name='User 3' id='3'/>
                    <DialogItem name='User 4' id='4'/>
                    <DialogItem name='User 5' id='5'/>
                    <DialogItem name='User 6' id='6'/>
            </div>
            <div className={s.messages}>
                <Message message='Hi'/>
                <Message message='Ho'/>
                <Message message='Yo'/>
                <div className={s.message}>Hi</div>
                <div className={s.message}>Ho</div>
                <div className={s.message}>Yo</div>
            </div>
        </div>
    )
}

export default Dialogs
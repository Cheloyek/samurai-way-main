import React from "react";
import s from './../Dialogs.module.css'

export type MessagePropsType = {
    message: string
}
//1
//props message <div className={s.message}>Hi</div> change to <NavLink to={path}>{props.name}</NavLink>
const Message = (props: MessagePropsType) => {

    return (
            <div className={s.message}>{props.message}</div>

    )
}

export default Message
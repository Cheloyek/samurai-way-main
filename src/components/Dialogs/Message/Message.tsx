import React from "react";
import s from './../Dialogs.module.css'

//props message <div className={s.message}>Hi</div> change to <NavLink to={path}>{props.name}</NavLink>
const Message = (props: any) => {

    return <div className={s.message}>{props.message}</div>
}

export default Message
import React from "react";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {DialogsType} from "../../../redux/store";



// props id name <NavLink to='/dialogs/user2'>User 2</NavLink>
const DialogItem = (props: DialogsType) => {
    let path = '/dialogs/' + props.id

    return <div>
    <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}><img src={props.url}/>{props.name}</NavLink>
    </div>
    </div>
}

export default DialogItem;
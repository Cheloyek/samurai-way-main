import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logOut: () => void
}

const Header = (props: MapPropsType & DispatchPropsType) => {
    return <header className={s.header}>
        <img src="https://www.formabasket.com/wa-data/public/shop/products/33/61/6133/images/14785/14785.970.jpg" alt=""/>
        <div className={s.loginBlock}>
            {props.isAuth
                ?<div>{props.login} <button onClick={props.logOut}>Log out</button></div>
                :<NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;
import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props: any) => {
    return <header className={s.header}>
        <img src="https://www.formabasket.com/wa-data/public/shop/products/33/61/6133/images/14785/14785.970.jpg" alt=""/>
        <div className={s.loginBlock}>
            {props.isAuth
                ?props.login
                :<NavLink to={'/login'}>Login</NavLink>}

        </div>
    </header>
}

export default Header;
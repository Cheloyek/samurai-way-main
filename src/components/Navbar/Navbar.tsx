import React from "react";
import s from './Navbar.module.css'

//check className in browser
//добавили ссылки на страницы при нажатии на кнопку
const Navbar = () => {
    return <nav className={s.nav}>
        <div className={s.nav}>
            <a href='/profile'>Profile</a>  {/*routing переход на страницу profile*/}
        </div>
        <div className={`${s.item} ${s.active}`}>
            <a href='/dialogs'>Messages</a>
        </div>
        <div className={s.nav}>
            <a href='/news'>News</a>
        </div>
        <div className={s.nav}>
            <a href='/music'>Music</a>
        </div>
        <div className={s.nav}>
            <a href='/settings'>Settings</a>
        </div>
    </nav>
}


export default Navbar;
import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

//check className in browser
//добавили ссылки на страницы при нажатии на кнопку

// переход на вкладки - обновление страницы
// <div className={s.nav}>
//     <a href='/profile'>Profile</a>  {/*routing переход на страницу profile*/}
// </div>


// переход на вкладки без обновления страницы - SPA
// activeClassName={s.activeLink} - при нажатии задает класс, чтобы можно былоназначить css
const Navbar = () => {
    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to='/profile' activeClassName={s.activeLink}>Profile</NavLink>  {/*routing переход на страницу profile*/}
        </div>
        <div className={`${s.item} ${s.active}`}>
            <NavLink to='/dialogs' activeClassName={s.activeLink}>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/news' activeClassName={s.activeLink}>News</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/music' activeClassName={s.activeLink}>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/settings' activeClassName={s.activeLink}>Settings</NavLink>
        </div>
    </nav>
}


export default Navbar;
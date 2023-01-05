import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

//check className in browser
//добавили ссылки на страницы при нажатии на кнопку

// переход на вкладки - обновление страницы
// <div className={s.nav}>
//     <a href='/profile'>Profile</a>  {/*routing переход на страницу profile*/}
// </div>


// SPA Single Page Application позволяет выполнять перерисовку страницы, переход на вкладки без полного обновления
const Navbar = () => {
    return <nav className={s.nav}>
        <div className={s.item}>

            {/*NavLink - используется для смены url без перезагрузки страницы, меняет url в браузере*/}
            {/*activeClassName={s.activeLink} - при нажатии задает класс, чтобы можно было назначить css*/}
            <NavLink to='/profile' activeClassName={s.activeLink}>Profile</NavLink>  {/*routing переход на страницу profile*/}
        </div>
        <div className={`${s.item} ${s.active}`}>
            <NavLink to='/dialogs' activeClassName={s.activeLink}>Messages</NavLink>
        </div>
        <div className={`${s.item} ${s.active}`}>
            <NavLink to='/users' activeClassName={s.activeLink}>Users</NavLink>
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
import React from "react";
import s from './Navbar.module.css'

/*let s = {
    'nav': 'Navbar_nav__SuIdW',
    'item': 'Navbar_item__EYY\+R'

  let class1 = 'item'
  let class2 = 'active'

  let classes = class1 + ' ' + class2 // item active
  or
  let classes = `${class1} ${class2}` // item active
  or
  let classes = `${s.item} ${s.active}` // item active
} */

//check className in browser
const Navbar = () => {
    return <nav className={s.nav}>
        <div>
            <a>Profile</a>
        </div>
        <div className={`${s.item} ${s.active}`}>
            <a>Messages</a>
        </div>
        <div className={s.nav}>
            <a>News</a>
        </div>
        <div className={s.nav}>
            <a>Music</a>
        </div>
        <div className={s.nav}>
            <a>Settings</a>
        </div>
    </nav>
}


export default Navbar;
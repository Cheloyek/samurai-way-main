import React from "react";
import preloader from "./preloader.svg";
import './preloader.css'

const Preloader = () => {
    return <div className={'a'}>
        <img src={preloader} alt="Loading"/>
    </div>
}

export default Preloader
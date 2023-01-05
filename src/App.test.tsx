import React, {FC} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import {ProfilePageType} from "./redux/profile-reducer";
import {FriendType} from "./redux/sidebar-reducer";
import {DialogPageType} from "./redux/dialogs-reducer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import store from "./redux/redux-store";
import ReactDOM from "react-dom";
import MainApp from "./App";

test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<MainApp/>, div)
    ReactDOM.unmountComponentAtNode(div)
})
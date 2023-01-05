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



// type AppPropsType = {
//     store: any
//     dispatch: Dispatch<AnyAction>
//     state: RootStateType
// }

// type ProfilePropsType = {
//     state: RootStateType
//     // addPost: (postMessage: string) => void
//     dispatch: () => void
//     //updateNewPostText: (newText: any) => void
//     updateNewMessageText: (newMessage: string) => void
//     addMessage: (newMessageText: string) => void
//     store: StoreType
// }

type SidebarType = {
    fiends: Array<FriendType>
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
    sidebar: SidebarType
}


class App extends React.Component<any> {
    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        console.log(this.props)
        // if (!this.props.initialized) {
        if (!this.props.initializeApp) {
            return <Preloader/>
        }

        return (
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs'
                               render={() => <DialogsContainer/>}
                        />

                        <Route
                            path='/profile/:userId?'
                            render={() => <ProfileContainer
                            />}
                        />

                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    initialized: state.app.initialized
}

// export default compose<FC>(
//     withRouter,
//     connect(mapStateToProps, {initializeApp}))(App)

let AppContainer = compose<FC>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

let MainApp = (props: any) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp
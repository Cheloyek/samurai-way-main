import React, {FC} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import News from "./components/News/News"; //react-router-dom -save (добавит в package.json)
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
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";



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
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <BrowserRouter>

                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        {/*<Route path='/dialogs' component={Dialogs}/>*/}
                        <Route path='/dialogs'
                               render={() => <DialogsContainer/>}
                        />

                        <Route
                            path='/profile/:userId?'
                            render={() => <ProfileContainer
                                // profilePage={props.state.profilePage} // передается profilePage: {posts:[], newPostText: ''} в Profile
                                // dispatch={props.dispatch}
                                // store={props.store}
                                //заменили на dispatch
                                //addPost={props.addPost}             // передается из store.ts -> render.tsx -> app.tsx -> Profile.tsx
                                //updateNewPostText={props.updateNewPostText}
                            />}
                        />

                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state: any) => {
    initialized: state.app.initialized
}

export default compose<FC>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

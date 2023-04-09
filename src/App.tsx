import React, {FC, Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {HashRouter, Redirect, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/WithSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        console.log('Some error')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initializeApp) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<div><Preloader/></div>}>
                        <Route path='/' render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/dialogs'
                            // render={() => <DialogsContainer/>}
                               render={() => <SuspendedDialogs/>}
                        />
                        <Route path='/profile/:userId?'
                            // render={() => <ProfileContainer/>}
                               render={() => <SuspendedProfile/>}
                        />
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        {/*<Route path='*' render={() => <div>404 PAGE NOT FOUND</div>}/>*/}
                    </Suspense>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<FC>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

let MainApp: React.FC = (props) => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default MainApp
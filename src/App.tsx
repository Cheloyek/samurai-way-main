import React, {FC, Suspense} from 'react';
import './App.css';
import {HashRouter, Link, NavLink, Redirect, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/WithSuspense";
import {Layout, Menu} from 'antd';

const {Header, Content, Footer, Sider} = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Chat = React.lazy(() => import('./pages/chat/Chat'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChat = withSuspense(Chat)

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
            <Layout style={{minHeight: "100vh"}}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item key='1'><Link to='/profile'>Profile</Link></Menu.Item>
                        <Menu.Item key='2'><NavLink to='/chat'>Chat</NavLink></Menu.Item>
                        <Menu.Item key='3'><NavLink to='/users'>Users</NavLink></Menu.Item>
                        <Menu.Item key='4'><NavLink to='/news'>News</NavLink></Menu.Item>
                        <Menu.Item key='5'><NavLink to='/music'>Music</NavLink></Menu.Item>
                        <Menu.Item key='6'><NavLink to='/settings'>Settings</NavLink></Menu.Item>
                        <Menu.Item key='7'><NavLink to='/dialogs'>Old Messages</NavLink></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{height: '100%'}}>
                    <Header style={{padding: 0, background: 'colorBgContainer'}}/>
                    <Content style={{margin: '24px 16px 0'}}>
                        <div>
                            <Suspense fallback={<div><Preloader/></div>}>
                                <Route path='/' render={() => <Redirect to={'/profile'}/>}/>
                                <Route path='/dialogs'
                                       render={() => <SuspendedDialogs/>}
                                />
                                <Route path='/profile/:userId?'
                                       render={() => <SuspendedProfile/>}
                                />
                                <Route path='/users' render={() => <UsersContainer/>}/>
                                <Route path='/news' render={() => <News/>}/>
                                <Route path='/music' render={() => <Music/>}/>
                                <Route path='/settings' render={() => <Settings/>}/>
                                <Route path='/login' render={() => <Login/>}/>
                                <Route path='/chat' render={() => <SuspendedChat/>}/>
                                {/*<Route path='*' render={() => <div>404 PAGE NOT FOUND</div>}/>*/}
                            </Suspense>
                        </div>
                    </Content>
                </Layout>
            </Layout>
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
        {/*<BrowserRouter>*/}
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
    {/*</BrowserRouter>*/
    }
}

export default MainApp
import React, {Dispatch} from 'react';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News"; //react-router-dom -save (добавит в package.json)
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {StoreType} from "./redux/store";
import {AnyAction, CombinedState} from "redux";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {Users} from "./components/Users/Users";
import UsersContainer from "./components/Users/UsersContainer";
import {ProfilePageType} from "./redux/profile-reducer";
import {FriendType} from "./redux/sidebar-reducer";
import {DialogPageType} from "./redux/dialogs-reducer";



type AppPropsType = {
    store: any
    dispatch: Dispatch<AnyAction>
    state: RootStateType
}

type ProfilePropsType = {
    state: RootStateType
    // addPost: (postMessage: string) => void
    dispatch: () => void
    //updateNewPostText: (newText: any) => void
    updateNewMessageText: (newMessage: string) => void
    addMessage: (newMessageText: string) => void
    store: StoreType
}

type SidebarType = {
    fiends: Array<FriendType>
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
    sidebar: SidebarType
}


function App(props: any) {
  return (
      <BrowserRouter>

          <div className='app-wrapper'>
              <Header/>
              <Navbar/>
              <div className='app-wrapper-content'>
                  {/*<Route path='/dialogs' component={Dialogs}/>*/}
                  <Route path='/dialogs'
                         render={() => <DialogsContainer store={props.store}
                         />}
                  />

                  <Route path='/profile'            //Route - реагирует на изменение url, если /profile то выполнит код
                         render={() => <Profile
                             // profilePage={props.state.profilePage} // передается profilePage: {posts:[], newPostText: ''} в Profile
                             // dispatch={props.dispatch}
                             store={props.store}
                             //заменили на dispatch
                             //addPost={props.addPost}             // передается из store.ts -> render.tsx -> app.tsx -> Profile.tsx
                             //updateNewPostText={props.updateNewPostText}
                         />}
                  />
                  <Route path='/users' render={() => <UsersContainer/>}/>
                  {/*<Route path='/news' component={News}/>*/}
                  <Route path='/news' render={() => <News/>}/>
                  {/*<Route path='/music' component={Music}/>*/}
                  <Route path='/music' render={() => <Music/>}/>
                  {/*<Route path='/settings' component={Settings}/>*/}
                  <Route path='/settings' render={() => <Settings/>}/>
                  <Route path='/settings' render={() => <Settings/>}/>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;

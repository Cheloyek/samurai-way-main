import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
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


function App(props: any) {
    return (
      <BrowserRouter>

          <div className='app-wrapper'>
              <HeaderContainer/>
              <Navbar/>
              <div className='app-wrapper-content'>
                  {/*<Route path='/dialogs' component={Dialogs}/>*/}
                  <Route path='/dialogs'
                      // @ts-ignore
                         render={() => <DialogsContainer/>}
                  />

                  <Route path='/profile/:userId?'            //Route - реагирует на изменение url, если /profile то выполнит код
                      // @ts-ignore
                         render={() => <ProfileContainer
                             // profilePage={props.state.profilePage} // передается profilePage: {posts:[], newPostText: ''} в Profile
                             // dispatch={props.dispatch}
                             // @ts-ignore
                             store={props.store}
                             //заменили на dispatch
                             //addPost={props.addPost}             // передается из store.ts -> render.tsx -> app.tsx -> Profile.tsx
                             //updateNewPostText={props.updateNewPostText}
                         />}
                  />

                  <Route path='/users' render={() =>
                      // @ts-ignore
                      <UsersContainer/>}/>
                  {/*<Route path='/news' component={News}/>*/}
                  <Route path='/news' render={() => <News/>}/>
                  {/*<Route path='/music' component={Music}/>*/}
                  <Route path='/music' render={() => <Music/>}/>
                  {/*<Route path='/settings' component={Settings}/>*/}
                  <Route path='/settings' render={() => <Settings/>}/>
                  <Route path='/login' render={() => <Login/>}/>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;

import React from 'react';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News"; //react-router-dom -save (добавит в package.json)
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import state, {addPost, PostType, RootStateType, updateNewPostText} from "./redux/state";


type ProfilePropsType = {
    state: RootStateType
    addPost: (postMessage: string) => void
    updateNewPostText: (newText: any) => void
    updateNewMessageText: (newMessage: string) => void
    addMessage: (newMessageText: string) => void
}

// props: any

function App(props: ProfilePropsType) {
    //вынесли в index
    // let posts = [
    //     {id: 1, message: 'abc', likesCount: '0'},
    //     {id: 2, message: 'defg', likesCount: '26'},
    // ]
    //<Profile posts={posts}/>}/> - передали через props в Profile
  return (
      <BrowserRouter>

          <div className='app-wrapper'>
              <Header/>
              <Navbar/>
              <div className='app-wrapper-content'>
                  {/*<Route path='/dialogs' component={Dialogs}/>*/}
                  <Route path='/dialogs' render={() => <Dialogs
                      state={props.state.dialogsPage}
                      updateNewMessageText={props.updateNewMessageText}
                      addMessage={props.addMessage}/>}
                  />
                  {/*<Route path='/profile' component={Profile}/>*/}
                  <Route path='/profile'
                         render={() => <Profile
                             profilePage={props.state.profilePage} // передается profilePage: {posts:[], newPostText: ''} в Profile
                             addPost={props.addPost}               // передается из state.ts -> render.tsx -> app.tsx -> Profile.tsx
                             updateNewPostText={props.updateNewPostText} />}
                  />
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

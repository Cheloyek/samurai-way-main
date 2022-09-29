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

function App(props: { posts: any; dialogs:any; messages: any}) {
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
                  <Route path='/dialogs' render={() => <Dialogs dialogs={props.dialogs} messages={props.messages}/>} />
                  {/*<Route path='/profile' component={Profile}/>*/}
                  <Route path='/profile' render={() => <Profile posts={props.posts}/>}/>
                  {/*<Route path='/news' component={News}/>*/}
                  <Route path='/news' render={() => <News/>}/>
                  {/*<Route path='/music' component={Music}/>*/}
                  <Route path='/music' render={() => <Music/>}/>
                  <Route path='/settings' component={Settings}/>
                  <Route path='/settings' render={() => <Settings/>}/>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;

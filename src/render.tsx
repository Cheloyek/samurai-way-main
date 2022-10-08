import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import state, {addPost} from "./redux/state";

//функция перерисовывает страницу при изменении
export const rerenderEntireTree = () => {
    ReactDOM.render(
        <App state={state} addPost={addPost}/>,
        document.getElementById('root')
    );
}
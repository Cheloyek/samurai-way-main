import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//убрали из-за цикличности между render и state, state передан через props
//import state from "./redux/state";

import {addPost} from "./redux/state";

//функция перерисовывает страницу при изменении. Через props передается state
export const rerenderEntireTree = (state: any) => {
    ReactDOM.render(
        <App state={state} addPost={addPost}/>,
        document.getElementById('root')
    );
}
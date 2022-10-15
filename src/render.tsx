import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//убрали из-за цикличности между render и state, state передан через props
//import state from "./redux/state";

import state, {addPost, PostType, RootStateType} from "./redux/state";

type renderPropsType = {
    state: RootStateType
    addPost: object
}

//функция перерисовывает страницу при изменении. Через props передается state
export const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <App state={state} addPost={addPost}/>,      // в app передается state и addPost из state.ts
        document.getElementById('root')
    );
}
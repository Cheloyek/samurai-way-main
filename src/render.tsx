import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//убрали из-за цикличности между render и state, state передан через props
//import state from "./redux/state";

import state, {
    addMessage,
    addPost,
    PostType,
    RootStateType,
    updateNewMessageText,
    updateNewPostText
} from "./redux/state";

// type renderPropsType = {
//     state: RootStateType
//     addPost: object
//     updateNewPostText: (postMessage: any)=> void
// }

//функция перерисовывает страницу при изменении. Через props передается state
export const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        // в app передается state, addPost и updateNewPostText из state.ts
        <App state={state}
             addPost={addPost}
             updateNewPostText={updateNewPostText}
             updateNewMessageText={updateNewMessageText}
             addMessage={addMessage}
        />,
        document.getElementById('root')
    );
}
//перенесли в index
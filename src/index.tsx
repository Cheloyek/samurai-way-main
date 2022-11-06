import React from 'react';
import './index.css';
import store from "./redux/redux-store";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

// функция перерисовывает дерево компонентов (страницу) при изменении.
// const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>,
    document.getElementById('root'));
// rerenderEntireTree()

// store.subscribe(() => {
    // let state = store.getState()
    // rerenderEntireTree()
// }) через эту функцию передали в state

// import {createStore} from "redux";
// import {combineReducers, legacy_createStore as createStore, Store} from "redux";
import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import profileReducer, {ProfilePageType} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'


export type ActionsTypes = ProfilePageType
export type RootState = typeof reducers
export type ReduxStateType = ReturnType<RootState>
export type StoreType = Store<ReduxStateType>

// reducer - чистая функция, которая принимает нужную часть state, action (чтобы понять что изменять), применяет его и возвращает измененный state
export let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

export type AppStateType = ReturnType<typeof reducers>

let store: StoreType = createStore(reducers, applyMiddleware(thunkMiddleware))

// window.store: any = store

export default store;
// import {createStore} from "redux";
// import {combineReducers, legacy_createStore as createStore, Store} from "redux";
import {combineReducers, createStore, Store} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {ProfilePageType} from "./store";


export type ActionsTypes = ProfilePageType
export type RootState = typeof reducers
export type ReduxStateType = ReturnType<RootState>
export type StoreType = Store<ReduxStateType>

// reducer - чистая функция, которая принимает нужную часть state, action (чтобы понять что изменять), применяет его и возвращает измененный state
export let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
})

let store: StoreType = createStore(reducers)

// window.store: any = store

export default store;
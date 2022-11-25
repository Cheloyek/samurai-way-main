// import {createStore} from "redux";
// import {combineReducers, legacy_createStore as createStore, Store} from "redux";
import {combineReducers, createStore, Store} from "redux";
import profileReducer, {ProfilePageType} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";


export type ActionsTypes = ProfilePageType
export type RootState = typeof rootReducer
export type ReduxStateType = ReturnType<RootState>
export type StoreType = Store<ReduxStateType>

// reducer - чистая функция, которая принимает нужную часть state, action (чтобы понять что изменять), применяет его и возвращает измененный state
export let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

let store: StoreType = createStore(rootReducer)

// window.store: any = store

export default store;
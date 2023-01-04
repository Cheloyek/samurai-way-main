// import {createStore} from "redux";
// import {combineReducers, legacy_createStore as createStore, Store} from "redux";
import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import profileReducer, {ProfilePageType} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'


export type ActionsTypes = ProfilePageType
export type RootState = typeof reducers
export type ReduxStateType = ReturnType<RootState>
export type StoreType = Store<ReduxStateType>

export let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: authReducer
})

export type AppStateType = ReturnType<typeof reducers>

let store: StoreType = createStore(reducers, applyMiddleware(thunkMiddleware))

declare global {
    interface Window {
        store: StoreType
    }
}

window.store = store

export default store;
import {Action, applyMiddleware, combineReducers, compose, createStore, Store} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";


export type RootState = typeof rootReducer
export type ReduxStateType = ReturnType<RootState>
export type StoreType = Store<ReduxStateType>
export type BaseThunkType<AT extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>
export type AppStateType = ReturnType<typeof rootReducer>
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

declare global {
    interface Window {
        store: StoreType
    }
}

// @ts-ignore
window.__store__ = store

export default store;
import {ResultCodesEnum} from "../api/api";
import {FormAction} from "redux-form";
import {authAPI} from "../api/auth-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {ifError} from "assert";

export type InitialStateType = typeof initialState
export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}
export type LocationType = {
    city: string
    country: string
}
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        case 'chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'chat/MESSAGES_RECEIVED', payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'chat/STATUS_CHANGED', payload: {status}
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

let newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
let statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.startChat()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stopChat()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    console.log(message)
    chatAPI.sendMessage(message)
}

export default chatReducer;
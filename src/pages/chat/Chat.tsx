import React, {useEffect, useRef, useState} from "react";
import {ChatMessageType, ws} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";
import {chatStatus} from "../../redux/chat-selectors";

export const Chat = () => {
    const status = useSelector(chatStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [ws])

    return <div>
        {status === 'error' && <div>Error</div>}
        <>
            <Messages/>
            <AddChatMessageForm/>
        </>
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({block: 'end', behavior: 'smooth'})
        }
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 135) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    return <div style={{height: '500px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return <div>
        <img src={message.photo}/><b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddChatMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const status = useSelector(chatStatus)
    // const status = useSelector((state: AppStateType) => state.chat.status)


    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    return <div>
        <div><textarea onChange={(e) => (setMessage(e.currentTarget.value))} value={message}></textarea></div>
        <div>
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
        </div>

    </div>
}

export default Chat
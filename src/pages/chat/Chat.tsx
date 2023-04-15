import React, {useEffect, useRef, useState} from "react";
import {ChatMessageAPIType, ws} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";
import {chatStatus} from "../../redux/chat-selectors";
import {Button, Input, Space} from "antd";
import s from './Chat.module.css'
import {v1} from "uuid";
import {authId} from "../../redux/auth-selectors";
import background from './background.png'

export const Chat = () => {

    const status = useSelector(chatStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [ws])

    return <div style={{width: '100%', height: '100%', backgroundColor: '#fffdfd'}}>
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
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    useEffect(() => {
        if (isAutoScroll) {
            setTimeout(() => {
                messagesAnchorRef.current?.scrollIntoView({block: 'end', behavior: 'smooth'})
            }, 500)

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

    return <div style={{maxHeight: '80vh', overflowY: 'auto', backgroundImage: `url(${background})`, marginLeft: 'auto', marginRight: 'auto', maxWidth: '1200px'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageAPIType }> = ({message}) => {
    const authUserId = useSelector(authId)

    return (
        message.userId === authUserId
            ? <div id={v1() + message.userId} className={s.message}>
                <div className={s.imageAndText}>
                    <img className={s.img} src={message.photo}/>
                    <div className={s.text}>
                        <div>
                            <div className={s.name}>{message.userName}</div>
                            <pre className={s.messageText}>{message.message}</pre>
                        </div>
                        <div className={s.time}>09:00</div>
                    </div>
                </div>
            </div>
            : <div className={s.friendMessage}>
                <div className={s.friendImageAndText}>
                    <img src={message.photo}/>
                    <div className={s.friendText}>
                        <div>
                            <div className={s.friendName}>{message.userName}</div>
                            <pre className={s.friendMessageText}>{message.message}</pre>
                        </div>
                        <div className={s.time}>09:01</div>
                    </div>

                </div>
            </div>
    )
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
        <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Space.Compact style={{paddingTop: '25px', paddingLeft: '10%', minWidth: '100%'}}>
                <Button type="primary" disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
                <Input placeholder="Write a message" bordered={false} maxLength={100} showCount
                       onChange={(e) => (setMessage(e.currentTarget.value))} value={message} style={{maxWidth: '70%'}}/>
            </Space.Compact>
        </div>

    </div>
}

export default Chat
import React, {useEffect, useRef, useState} from "react";
import {ChatMessageAPIType, ws} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";
import {chatStatus} from "../../redux/chat-selectors";
import {Button, Input, Space} from "antd";
import TextArea from "antd/es/input/TextArea";

export const Chat = () => {
    const status = useSelector(chatStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [ws])

    return <div style={{width: '100%', height: '100%'}}>
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

    return <div style={{maxHeight: '80vh', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo (({message}) => {
    return <div>
        <img src={message.photo}/><b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})

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
        {/*<div><textarea onChange={(e) => (setMessage(e.currentTarget.value))} value={message}></textarea></div>*/}
        {/*<div><Input onChange={(e) => (setMessage(e.currentTarget.value))} value={message}></Input></div>*/}
        <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Space.Compact style={{ paddingTop: '25px', paddingLeft: '10%', minWidth: '100%'}}>
                <Button type="primary" disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
                <Input placeholder="Borderless" bordered={false} maxLength={100} showCount onChange={(e) => (setMessage(e.currentTarget.value))} value={message} style={{maxWidth: '70%'}}/>
                {/*<TextArea onChange={(e) => (setMessage(e.currentTarget.value))} value={message} maxLength={100} style={{ width: '70%', height: 32, marginBottom: 24 }}/>*/}
            </Space.Compact>
            {/*<button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>*/}
            {/*<Button style={{backgroundColor: '#1676fe'}} type='primary' size='middle' disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>*/}
        </div>

    </div>
}

export default Chat
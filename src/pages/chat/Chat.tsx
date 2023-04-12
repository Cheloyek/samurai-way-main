import React, {useEffect} from "react";

type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export const Chat = () => {

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            console.log(JSON.parse(e.data))
        })
    }, [])
    return <div>
        <ChatMessages/>
    </div>
}

const ChatMessages = () => {
    return <div>
        <Messages/>
        <AddChatMessageForm/>
    </div>
}

const Messages = () => {
    const messages = [1, 2, 3, 4, 5, 6, 7, 8]
    return <div style={{height: '500px', overflowY: 'auto'}}>
        {messages.map((m: any) => <ChatMessage/>)}
    </div>
}

const ChatMessage = () => {
    const message: ChatMessageType = {
        author: 'name',
        url: 'https://picsum.photos/id/237/50/50',
        text: 'message'
    }
    return <div>
        <img src={message.url}/><b>{message.author}</b>
        <br/>
        {message.text}
        <hr/>
    </div>
}

const AddChatMessageForm = () => {
    return <div>
        <div><textarea></textarea></div>
        <div><button>Send</button></div>

    </div>
}

export default Chat
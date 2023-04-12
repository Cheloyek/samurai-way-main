import React, {useEffect, useState} from "react";

type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export const Chat = () => {
    const [ws, setWs] = useState<WebSocket | null>(null)

    useEffect(() => {
        let webSocket: WebSocket
        const closeWsHandler = () => {
            console.log('close channel')
            setTimeout(createChannel, 2000)
        }

        function createChannel() {
            webSocket?.removeEventListener('close', closeWsHandler)
            webSocket?.close()
            webSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            webSocket.addEventListener('close', closeWsHandler)
            setWs(webSocket)
        }

        createChannel()

        return () => {
            webSocket.addEventListener('close', closeWsHandler)
            webSocket.close()
        }
    }, [])

    return <div>
        <Messages ws={ws}/>
        <AddChatMessageForm ws={ws}/>
    </div>
}

// const ChatMessages: React.FC<{ws: WebSocket | null}> = ({ ws}) => {
//     return <div>
//         <Messages ws={ws}/>
//     </div>
// }

const Messages: React.FC<{ ws: WebSocket | null }> = ({ws}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        ws?.addEventListener('message', messageHandler)

        return () => {
            ws?.removeEventListener('message', messageHandler)
        }
    }, [ws])

    return <div style={{height: '500px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
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

const AddChatMessageForm: React.FC<{ ws: WebSocket | null }> = ({ws}) => {
    const [message, setMessage] = useState('')
    const [wsStatus, setWsStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openWsHandler = () => {
            setWsStatus('ready')
        };
        ws?.addEventListener('open', openWsHandler)

        return () => {
            ws?.removeEventListener('open', openWsHandler)
        }
    }, [ws])

    const sendMessage = () => {
        if (message !== null) {
            if (message) {
                ws?.send(message)
                setMessage('')
            } else {
                return
            }
        }
    }
    return <div>
        <div><textarea onChange={(e) => (setMessage(e.currentTarget.value))} value={message}></textarea></div>
        <div>
            <button disabled={ws === null || wsStatus !== 'ready'} onClick={sendMessage}>Send</button>
        </div>

    </div>
}

export default Chat

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
type EventsNamesType = 'messages-received' | 'status-changed'
export type StatusType = 'pending' | 'ready' | 'error'

export let ws: WebSocket | null

const closeWsHandler = () => {
    noticeAboutStatus('pending')
    setTimeout(createChannel, 2000)
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeWsHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const noticeAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    noticeAboutStatus('pending')
    ws.addEventListener('close', closeWsHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach((s) => s(newMessages))
}

const openHandler = () => {
    noticeAboutStatus('ready')
}

const errorHandler = () => {
    noticeAboutStatus('error')
    console.log('error')
}

let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

export const chatAPI = {
    startChat() {
        createChannel()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    stopChat() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        ws?.close()
        cleanUp()
    }
}
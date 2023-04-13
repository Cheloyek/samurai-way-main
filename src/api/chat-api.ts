
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type SubscriberType = (messages: ChatMessageType[]) => void

let ws: WebSocket | null

const closeWsHandler = () => {
    console.log('close channel')
    setTimeout(createChannel, 2000)
}

function createChannel() {
    ws?.removeEventListener('close', closeWsHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeWsHandler)
    ws.addEventListener('message', messageHandler)
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers.forEach((s) => s(newMessages))
}

let subscribers = [] as SubscriberType[]

export const chatAPI = {
    startChat() {
        createChannel()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    stopChat() {
        subscribers = []
        ws?.close()
        ws?.removeEventListener('close', closeWsHandler)
        ws?.removeEventListener('message', messageHandler)
    }
}
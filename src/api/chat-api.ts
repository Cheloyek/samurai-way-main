
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type SubscriberType = (messages: ChatMessageType[]) => void

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
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers.forEach((s) => s(newMessages))
}

let subscribers = [] as SubscriberType[]

export const chatAPI = {
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    }
}
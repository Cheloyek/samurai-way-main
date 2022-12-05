import React from "react";
import {StoreType} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

type DialogsPropsType = {
    store: StoreType
    // state: DialogPageType
    // updateNewMessageText: (newMessage: any) => void
    // addMessage: (newMessageText:string) => void
    // dispatch: any
}
//2 заменили на connect
// const DialogsContainer = (props: any) => {
//     // debugger
//     let state = props.store.getState().dialogsPage
//
//     const onSendMessageClick = () => {
//         props.store.dispatch(sendMessageCreator())
//
//     }
//
//     let onNewMessageChange = (body:any) => {
//         props.store.dispatch(updateNewMessageBodyCreator(body))
//     }
//
//     return (
//         <Dialogs
//         updateNewMessageBody={onNewMessageChange}
//         sendMessage={onSendMessageClick}
//         dialogsPage={state}/>
//     )
// }

// возвращают объекты, которые передаются параметрами
// data
let mapStateToProps = (state: any) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

// callbacks
let mapDispatchToProps = (dispatch: any) => {
    return {
        updateNewMessageBody: (body: any) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
    }
}

// let AuthRedirectComponent = WithAuthRedirect(Dialogs)


//connect() - вызывает функцию connect, которая вернула другую функцию, которую вызываем connect()()
//connect()(Dialogs) - вызываем контейнерную компоненту, которая передает данные в Dialogs
//connect создает контейнерную компоненту, внутри которой рендерит презентационную и внутрь презентационной передает свойства mapStateToProps, mapDispatchToProps
// @ts-ignore
// let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

// export default DialogsContainer

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)

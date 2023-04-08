import React from "react";
import {actions} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

// let mapDispatchToProps = (dispatch: any) => {
//     return {
//         sendMessage: (newMessageBody: any) => {
//             dispatch(actions.sendMessage(newMessageBody))
//         },
//     }
// }

export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessage: actions.sendMessage}),
    WithAuthRedirect
)(Dialogs)

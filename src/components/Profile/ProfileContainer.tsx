import React from "react";
import {compose} from "redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type PathParamType = {
    userId: string
}
// type MapStateToPropsForRedirectType = {
//     isAuth: boolean
// }
// type MapStateToPropsType = {
//     profile: number
//     status: string
//     authorizedUserId: number
//     isAuth: boolean
// }
//
// type MapDispatchToPropsType = {
//     setUsers: (profile: any) => void
// }

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => void
    savePhoto: (file: File) => void
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamType>;

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = Number(this.props.match.params.userId)
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId as number)
        this.props.getStatus(userId as number)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<PropsType>) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                // saveProfile={saveProfile}
                savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth

})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, saveProfile, savePhoto}),
    withRouter,
)(ProfileContainer)

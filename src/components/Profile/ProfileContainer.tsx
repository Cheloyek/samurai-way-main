import React, {Dispatch} from "react";
import {AnyAction, compose} from "redux";
import {
    getStatus,
    getUserProfile,
    ProfilePageType,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";

type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: Dispatch<AnyAction>
}

type PathParamType = {
    userId: string
}

type MapStateToPropsForRedirectType = {
    isAuth: boolean
}
type MapStateToPropsType = {
    profile: number
    status: string
    authorizedUserId: number
    isAuth: boolean
}

type MapDispatchToPropsType = {
    setUsers: (profile: any) => void
}

type OwnPropsType = MapStateToPropsForRedirectType & MapStateToPropsType & MapDispatchToPropsType

type PropsType = RouteComponentProps<PathParamType> & OwnPropsType

class ProfileContainer extends React.Component<any, any> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        console.log('this.props.match.params.userId', this.props.match.params.userId, 'prevProps', prevProps)
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                saveProfile={saveProfile}
                savePhoto={this.props.savePhoto}
            />
        )
    }
}

//hoc
// let AuthRedirectComponent: any = WithAuthRedirect(ProfileContainer)


let mapStateToProps = (state: any): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,  //?
    isAuth: state.auth.isAuth //?

})

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent) //withRouter добавит в ProfileContainer данные из url
// export default connect(mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent);


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, saveProfile, savePhoto}),
    withRouter,
)(ProfileContainer)

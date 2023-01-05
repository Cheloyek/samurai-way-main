import React, {Dispatch} from "react";
import {AnyAction, compose} from "redux";
import {getStatus, getUserProfile, ProfilePageType, updateStatus} from "../../redux/profile-reducer";
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
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if(!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)

        console.log('status',this.props.status)
        console.log('profile',this.props.profile)
    }

    render() {
            return (
                <Profile
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
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
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
)(ProfileContainer)

import React, {Dispatch} from "react";
import {AnyAction, compose} from "redux";
import {getStatus, getUserProfile, ProfilePageType, setUserProfile, updateStatus} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {connect} from "react-redux";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {RootStateType} from "../../App";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: Dispatch<AnyAction>
    // addPost:  (postMessage: string) => void
    // updateNewPostText: (newText: any) => void
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
}

type MapDispatchToPropsType = {
    setUsers: (profile: any) => void
}

type OwnPropsType = MapStateToPropsForRedirectType & MapStateToPropsType & MapDispatchToPropsType

type PropsType = RouteComponentProps<PathParamType> & OwnPropsType

class ProfileContainer extends React.Component<any, any> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        //профиль по умолчанию
        if (!userId) {
            userId = '26584'
        }
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        //     .then(response => {
        //         this.props.setUserProfile(response.data)
        //     })
        this.props.getUserProfile(userId)
        // usersAPI.getProfile(userId)
        //     .then(data => {
        //                 this.props.setUserProfile(data)
        //             })
        this.props.getStatus(userId)
    }

    render() {
        debugger
        // if (!this.props.isAuth) {
        //     return <Redirect to={'/login'}/>
        // } else {
            return (
                <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
            )
        }
    // }
}

//hoc
// let AuthRedirectComponent: any = WithAuthRedirect(ProfileContainer)


let mapStateToProps = (state: any): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent) //withRouter добавит в ProfileContainer данные из url
// export default connect(mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent);


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
)(ProfileContainer)

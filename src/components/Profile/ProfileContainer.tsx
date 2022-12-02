import React, {Dispatch} from "react";
import {AnyAction} from "redux";
import {getUserProfile, ProfilePageType, setUserProfile} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {connect} from "react-redux";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {RootStateType} from "../../App";

type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: Dispatch<AnyAction>
    // addPost:  (postMessage: string) => void
    // updateNewPostText: (newText: any) => void
}

type PathParamType = {
    userId: string
}

type MapStateToPropsType = {
    profile: number
    isAuth: boolean
}

type MapDispatchToPropsType = {
    setUsers: (profile: any) => void
}

type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType

type PropsType = RouteComponentProps<PathParamType> & OwnPropsType

class ProfileContainer extends React.Component<any, any> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        //профиль по умолчанию
        if (!userId) {
            userId = '2'
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
    }

    render() {
        debugger
        if (!this.props.isAuth) {
            debugger
            return <Redirect to={'/login'}/>
        } else {
            return (
                <Profile {...this.props} profile={this.props.profile}/>
            )
        }
    }
}

let mapStateToProps = (state: any): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.data.isAuth
})
let WithUrlDataContainerComponent = withRouter(ProfileContainer) //withRouter добавит в ProfileContainer данные из url
export default connect(mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent);
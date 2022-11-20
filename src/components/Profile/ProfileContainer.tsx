import React, {Dispatch} from "react";
import {AnyAction} from "redux";
import {ProfilePageType, setUserProfile} from "../../redux/profile-reducer";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import profile from "./Profile";
import {withRouter} from "react-router-dom";

type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: Dispatch<AnyAction>
    // addPost:  (postMessage: string) => void
    // updateNewPostText: (newText: any) => void
}

class ProfileContainer extends React.Component<any, any> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        //профиль по умолчанию
        if (!userId) {
            userId = 2
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
                <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: any) => ({profile: state.profilePage.profile})
let WithUrlDataContainerComponent = withRouter(ProfileContainer) //withRouter добавит в ProfileContainer данные из url
export default connect(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);
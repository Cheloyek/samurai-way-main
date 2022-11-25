import React from "react";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import {usersAPI} from "../../api/api";

class HeaderContainer extends React.Component<any, any> {
    componentDidMount() {
        // axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        //     withCredentials: true
        // })
        usersAPI.getMe()
            // .then(response => {
            //     if (response.data.resultCode === 0) {
            //         let {id, login, email} = response.data.data
            //         this.props.setAuthUserData(id, login, email)
            //     }
            // })
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data
                    this.props.setAuthUserData(id, login, email)
                }
            })
    }

    render()
    {
        return <Header {...this.props}/>
    }
}


const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData}) (HeaderContainer);
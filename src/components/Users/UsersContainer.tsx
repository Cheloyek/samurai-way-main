import React from "react";
import {connect} from "react-redux";
import {Users} from "./Users";
import {followAC, InitialStateType, setUsersAC, unfollowAC, UserType} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import UsersC from "./UsersClass";

type MapStatePropsType = {
    usersPage: InitialStateType
    users: Array<UserType>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

export type ActionType = {

}
// data
let mapStateToProps = (state: AppStateType): any => {
    return {
        users: state.usersPage.users
    }
}

// callbacks
let mapDispatchToProps = (dispatch: Dispatch, action: any): MapDispatchPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(UsersC)
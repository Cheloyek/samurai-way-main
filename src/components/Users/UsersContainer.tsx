import React from "react";
import {connect} from "react-redux";
import {
    requestUsers, follow, unfollow, FilterType
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress, getIsFetching,
    getPageSize, getTotalUsersCount, getUsers,
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
type OwnPropsType = {
    getUsers: (currentPage: number, pageSize: number, term: string) => void,
}
type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: any
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (setIsFetching: boolean) => void
    toggleIsFollowingProgress: (setIsFetching: boolean) => void
}

export type UsersContainerType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize, '')
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize, '')
    }

    onFilterChanged = (filter: FilterType) => {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize, filter.term)
    }

    render() {
        return <div>
            {this.props.isFetching ? <Preloader/> : null} {/*loading img*/}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress} // disabled button
            />
        </div>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state), //users: state.usersPage.users
        pageSize: getPageSize(state), //pageSize: state.usersPage.pageSize
        totalUsersCount: getTotalUsersCount(state), //totalUsersCount: state.usersPage.totalUsersCount
        currentPage: getCurrentPage(state), //currentPage: state.usersPage.currentPage
        isFetching: getIsFetching(state), //isFetching: state.usersPage.isFetching
        followingInProgress: getFollowingInProgress(state) //followingInProgress: state.usersPage.followingInProgress
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {
            follow, unfollow, getUsers: requestUsers
        }),
)(UsersContainer)
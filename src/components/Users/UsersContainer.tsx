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
    getPageSize, getTotalUsersCount, getUsers, getUsersFilter,
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
type OwnPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void,
}
type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    filter: FilterType
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
        const {currentPage, pageSize, filter} = this.props
        this.props.getUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props
        this.props.getUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.getUsers(1, pageSize, filter)
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
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {
            follow, unfollow, getUsers: requestUsers
        }),
)(UsersContainer)
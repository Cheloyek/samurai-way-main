import React from "react";
import {connect} from "react-redux";
import {
    setCurrentPage,
    UserType, toggleIsFollowingProgress, requestUsers, follow, unfollow
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress, getIsFetching,
    getPageSize, getTotalUsersCount, getUsers,
} from "../../redux/users-selectors";

class UsersContainer extends React.Component<any, any> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize) //this.props.currentPage, pageSize
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <div>
            {this.props.isFetching ? <Preloader/> : null} {/*loading img*/}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress} // disabled button
            />
        </div>
    }
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

// data
// let mapStateToProps = (state: AppStateType): MapStatePropsType => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

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


// let AuthRedirectComponent = WithAuthRedirect(UsersContainer)

// export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
// export default connect(mapStateToProps,
//     {follow, unfollow, setCurrentPage,
//         toggleIsFollowingProgress, getUsers})(AuthRedirectComponent)

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {follow, unfollow, setCurrentPage,
            toggleIsFollowingProgress, getUsers: requestUsers}),
)(UsersContainer)
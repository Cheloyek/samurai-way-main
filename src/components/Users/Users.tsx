import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type UserPhotoType = {
    small: string | null
    large: string | null
}

type UserType = {
    followed: boolean
    id: number
    name: string
    photos: UserPhotoType
    status: string | null
    uniqueUrlName: string | null
}

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    // toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: []
}

let Users = (props: UsersPropsType) => {
    return <div>
        <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                   totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}/>
        <div>
            {
                props.users.map((u) => <User user={u}
                                             followingInProgress={props.followingInProgress || []}
                                             follow={props.follow}
                                             unfollow={props.unfollow}
                                             key={u.id}
                    />
                )
            }
        </div>
    </div>
}

export default Users
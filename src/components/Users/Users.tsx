import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";

type PropsType = {
    pageSize: number
    currentPage: number
    users: UserType[]
    totalUsersCount: number
    followingInProgress: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
}

let Users: React.FC<PropsType> = ({
                                      totalUsersCount,
                                      pageSize,
                                      currentPage,
                                      users,
                                      unfollow,
                                      follow,
                                      onPageChanged,
                                      onFilterChanged,
                                      followingInProgress
                                  }) => {
    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totaItemsCount={totalUsersCount} pageSize={pageSize} portionSize={10}/>
        <div>
            {
                users.map((u) => <User user={u}
                                       followingInProgress={followingInProgress || []}
                                       follow={follow}
                                       unfollow={unfollow}
                                       key={u.id}
                    />
                )
            }
        </div>
    </div>
}

export default Users
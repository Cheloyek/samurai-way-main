import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";


// export type UserType = {
//     id: number
//     name: string
//     followed: boolean
//     photos: PhotosType
//     status: string | null
//     uniqueUrlName: string | null
// }

type PropsType = {
    pageSize: number
    currentPage: number
    users: UserType[]
    totalUsersCount: number
    followingInProgress: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
}

let Users: React.FC<PropsType> = ({
                                      totalUsersCount,
                                      pageSize,
                                      currentPage,
                                      users,
                                      unfollow,
                                      follow,
                                      onPageChanged,
                                      followingInProgress
                                  }) => {
    return <div>
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
import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import { UserType } from "../../types/types";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: []
}
type PropsType = {
    user: UserType
    followingInProgress: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {
    return <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos?.small !== null ? user.photos?.small : userPhoto} className={styles.userPhoto}
                                 alt={'userPhoto'}/>
                        </NavLink>
                    </div>
                    <div>
                        {user?.followed
                            ? <button disabled={followingInProgress
                                .some((id:any) => id === user.id)}
                                      onClick={() => {unfollow(user.id)}}>
                                unfollow</button>
                            : <button disabled={followingInProgress
                                .some((id:any) => id === user.id)}
                                      onClick={() => {follow(user.id)}}>
                                follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <h2>{user?.name}</h2>
                        <div>{user?.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.country"}</div><div>{"user.location.city"}</div>
                    </span>
                </span>
            </div>
}

export default User
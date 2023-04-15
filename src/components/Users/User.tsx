import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";
import {Button} from "antd";

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
    return <div style={{paddingBottom: '10px'}}>
        <div>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos?.small !== null ? user.photos?.small : userPhoto} className={styles.userPhoto}
                     alt={'userPhoto'}/>
            </NavLink>
        </div>
        <div>
                         <span>
                        <h2>{user?.name}</h2>
                        <div style={{paddingBottom: '5px'}}>{user?.status}</div>
                    </span>
            <div style={{paddingBottom: '20px'}}>
                {user?.followed
                    ? <Button style={{backgroundColor: 'lightgrey'}} disabled={followingInProgress
                        .some((id: number) => id === user.id)}
                              onClick={() => {
                                  unfollow(user.id)
                              }}>
                        unfollow</Button>
                    : <Button type='primary' disabled={followingInProgress
                        .some((id: number) => id === user.id)}
                              onClick={() => {
                                  follow(user.id)
                              }}>
                        follow</Button>}
            </div>

        </div>
    </div>
}

export default User
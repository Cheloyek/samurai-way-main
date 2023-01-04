import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

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

    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    // let pages: Array<number> = [];
    // for (let i = 1; i <= pagesCount; i++) {
    //     pages.push(i)
    // }
    return <div>
        {/*<div>*/}
        {/*    {pages.map((p) => {*/}
        {/*        // @ts-ignore*/}
        {/*        return <span className={props.currentPage === p && styles.selectedPage}*/}
        {/*                     onClick={(e) => {*/}
        {/*                         props.onPageChanged(p)*/}
        {/*                     }}>{p}-</span>*/}
        {/*    })}*/}
        {/*</div>*/}
        <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}/>
        {
            props.users.map((u) => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}> {/*user profile*/}
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}
                                 alt={'userPhoto'}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress
                                .some(id => id === u.id)}
                                      onClick={() => {props.unfollow(u.id)}}>
                                unfollow</button>
                            : <button disabled={props.followingInProgress
                                .some(id => id === u.id)}
                                      onClick={() => {props.follow(u.id)}}>
                                follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <h2>{u.name}</h2>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div><div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users
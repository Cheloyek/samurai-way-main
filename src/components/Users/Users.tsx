import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

// export type UsersPropsType = {
//     totalUsersCount:
//         pageSize:
//         currentPage:
//         users:
//         unfollow:
//         follow:
// }

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
}

let Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    console.log(props)
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>

            {pages.map((p: number) => {
                // @ts-ignore
                return <span className={props.currentPage === p && styles.selectedPage}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}-</span>
            })}
        </div>
        {
            props.users.map((u: any) => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}> {/*user profile*/}
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}
                                 alt={'userPhoto'}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {

                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': '34d100b8-894d-4061-9da0-9a27cb217fe9'
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                    })

                            }}>unfollow</button>
                            : <button onClick={() => {

                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': '34d100b8-894d-4061-9da0-9a27cb217fe9'
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                    })

                            }}>follow</button>}
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
import React from "react";
import styles from "./users.module.css"
import {UsersPropsType} from "./UsersContainer";

export let Users = (props: UsersPropsType) => {

    if(props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: "https://mykaleidoscope.ru/uploads/posts/2022-08/1659724523_66-mykaleidoscope-ru-p-domik-v-gorakh-u-ozera-dizain-krasivo-foto-68.jpg",
                followed: true,
                fullName: 'Dmitry',
                status: 'Good',
                location: {city: "Prague", country: "Czech"}
            },
            {
                id: 2,
                photoUrl: "https://mykaleidoscope.ru/uploads/posts/2022-08/1659724523_66-mykaleidoscope-ru-p-domik-v-gorakh-u-ozera-dizain-krasivo-foto-68.jpg",
                followed: false,
                fullName: 'Dmitry',
                status: 'Good',
                location: {city: "Moscow", country: "Russia"}
            },
        ])
    }

    return <div>
        {
            props.users.map((u: any) => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {props.unfollow(u.id)}}>unfollow</button>
                            : <button onClick={() => {props.follow(u.id)}}>follow</button> }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div><div>{u.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}
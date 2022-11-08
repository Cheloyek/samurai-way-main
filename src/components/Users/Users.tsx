import React from "react";
import styles from "./users.module.css"
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import userPhoto from './../../../src/assets/images/user.png'

export let Users = (props: UsersPropsType) => {
    let getUsers = () => {
        if(props.users.length === 0) {

        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response =>{
                    props.setUsers(response.data.items)
    }


                // [
                // {
                //     id: 1,
                //     photoUrl: "https://mykaleidoscope.ru/uploads/posts/2022-08/1659724523_66-mykaleidoscope-ru-p-domik-v-gorakh-u-ozera-dizain-krasivo-foto-68.jpg",
                //     followed: true,
                //     fullName: 'Dmitry',
                //     status: 'Good',
                //     location: {city: "Prague", country: "Czech"}
                // },
                // {
                //     id: 2,
                //     photoUrl: "https://mykaleidoscope.ru/uploads/posts/2022-08/1659724523_66-mykaleidoscope-ru-p-domik-v-gorakh-u-ozera-dizain-krasivo-foto-68.jpg",
                //     followed: false,
                //     fullName: 'Dmitry',
                //     status: 'Good',
                //     location: {city: "Moscow", country: "Russia"}
                // },
                // ]
            )
        }
    }

    return <div>
        <button onClick={getUsers}>Get Users</button>
        {
            props.users.map((u: any) => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {props.unfollow(u.id)}}>unfollow</button>
                            : <button onClick={() => {props.follow(u.id)}}>follow</button> }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
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
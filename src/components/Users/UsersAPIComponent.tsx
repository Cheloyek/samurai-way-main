import React from "react";
import styles from "./users.module.css"
import {UsersContainerType} from "./UsersContainer";
import axios from "axios";
import userPhoto from './../../../src/assets/images/user.png'
import Users from "./Users";

// class UsersnotUsed extends React.Component {
//     getUsers = () => {
//         if(this.props.users.length === 0) {
//
//             axios.get('https://social-network.samuraijs.com/api/1.0/users')
//                 .then(response =>{
//                         this.props.setUsers(response.data.items)
//                     }
//
//
//                     // [
//                     // {
//                     //     id: 1,
//                     //     photoUrl: "https://mykaleidoscope.ru/uploads/posts/2022-08/1659724523_66-mykaleidoscope-ru-p-domik-v-gorakh-u-ozera-dizain-krasivo-foto-68.jpg",
//                     //     followed: true,
//                     //     fullName: 'Dmitry',
//                     //     status: 'Good',
//                     //     location: {city: "Prague", country: "Czech"}
//                     // },
//                     // {
//                     //     id: 2,
//                     //     photoUrl: "https://mykaleidoscope.ru/uploads/posts/2022-08/1659724523_66-mykaleidoscope-ru-p-domik-v-gorakh-u-ozera-dizain-krasivo-foto-68.jpg",
//                     //     followed: false,
//                     //     fullName: 'Dmitry',
//                     //     status: 'Good',
//                     //     location: {city: "Moscow", country: "Russia"}
//                     // },
//                     // ]
//                 )
//         }
//     }
//     render() {
//         return <div>
//             <button onClick={this.getUsers}>Get UsersnotUsed</button>
//             {
//                 this.props.users.map((u: any) => <div key={u.id}>
//                 <span>
//                     <div>
//                         <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
//                     </div>
//                     <div>
//                         {u.followed
//                             ? <button onClick={() => {this.props.unfollow(u.id)}}>unfollow</button>
//                             : <button onClick={() => {this.props.follow(u.id)}}>follow</button> }
//                     </div>
//                 </span>
//                     <span>
//                     <span>
//                         <div>{u.name}</div>
//                         <div>{u.status}</div>
//                     </span>
//                     <span>
//                         <div>{"u.location.country"}</div><div>{"u.location.city"}</div>
//                     </span>
//                 </span>
//                 </div>)
//             }
//         </div>
//     }
// }

// class UsersnotUsed extends React.Component<UsersPropsType, any> {
//     constructor(props: UsersPropsType) {
//         super(props);
//             axios.get('https://social-network.samuraijs.com/api/1.0/users')
//                 .then(response => {
//                         this.props.setUsers(response.data.items)
//                     }
//                 )
//     }
//
//     render() {
//         return <div>
//             {
//                 this.props.users.map((u: any) => <div key={u.id}>
//                 <span>
//                     <div>
//                         <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
//                     </div>
//                     <div>
//                         {u.followed
//                             ? <button onClick={() => {
//                                 this.props.unfollow(u.id)
//                             }}>unfollow</button>
//                             : <button onClick={() => {
//                                 this.props.follow(u.id)
//                             }}>follow</button>}
//                     </div>
//                 </span>
//                     <span>
//                     <span>
//                         <div>{u.name}</div>
//                         <div>{u.status}</div>
//                     </span>
//                     <span>
//                         <div>{"u.location.country"}</div><div>{"u.location.city"}</div>
//                     </span>
//                 </span>
//                 </div>)
//             }
//         </div>
//     }
// }


class UsersAPIComponent extends React.Component<UsersContainerType, any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)

            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }



    render() {
        // let pagesCount = Math.ceil(this.props.totalUsersCount/this.props.pageSize);
        // // let pagesCount = 5;
        // console.log(this.props)
        // let pages:Array<number> = [];
        // for (let i = 1; i <= pagesCount; i++) {
        //     pages.push(i)
        // }


        return <div>
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        </div>
    }
}

export default UsersAPIComponent

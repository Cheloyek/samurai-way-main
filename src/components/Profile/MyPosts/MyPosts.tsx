import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props: any) => {
    return (
        <div>
            <textarea></textarea>
            <button className={s.button}>Add post</button>
            <button className={s.button}>Remove</button>
            <div>
                New post
            </div>
            <div className={s.posts}>
                <Post message='abc' likesCount='0'/>
                <Post message='defg' likesCount='26'/>
            </div>
        </div>
    )
}

export default MyPosts;
import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props: any) => {
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button className={s.button}>Add post</button>
                </div>
                <div>
                    New post
                </div>
                <div className={s.posts}>
                    <Post message='abc' likesCount='0'/>
                    <Post message='defg' likesCount='26'/>
                </div>
            </div>
        </div>
    )
}

export default MyPosts;
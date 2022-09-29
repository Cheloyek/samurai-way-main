import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

// props из app -> profile передается в MyPosts
const MyPosts = (props:any) => {
    let postsElements = props.posts.map((p: { message: string; likesCount: any; }) => <Post message={p.message} likesCount={p.likesCount}/>)
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
                    {/*<Post message={posts[0].message} likesCount={posts[0].likesCount}/>*/}
                    {/*<Post message={posts[1].message} likesCount={posts[1].likesCount}/>*/}
                    {postsElements}
                </div>
            </div>
        </div>
    )
}

export default MyPosts;
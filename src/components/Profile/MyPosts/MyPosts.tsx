import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

let posts = [
    {id: 1, message: 'abc', likesCount: '0'},
    {id: 2, message: 'defg', likesCount: '26'},
]

let postsElements = posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

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
                    {/*<Post message={posts[0].message} likesCount={posts[0].likesCount}/>*/}
                    {/*<Post message={posts[1].message} likesCount={posts[1].likesCount}/>*/}
                    {postsElements}
                </div>
            </div>
        </div>
    )
}

export default MyPosts;
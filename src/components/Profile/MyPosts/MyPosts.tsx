import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Posts";

const MyPosts = () => {
    return (
        <div>
        <textarea></textarea>
        <button>Add post</button>
        <button>Remove</button>
        <div>
            New post
        </div>
        <Post/>
        <Post/>
        <Post/>
    </div>
    )
}

export default MyPosts;
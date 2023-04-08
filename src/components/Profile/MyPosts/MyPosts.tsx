import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {PostType} from "../../../types/types";
import AddNewPostForm, {AddPostFormValuesType} from "./AddNewPostForm";

export type MapPropsType = {
    posts: PostType[]
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = React.memo((props) => {
    let postsElements = [...props.posts].reverse().map((p: PostType) => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <AddNewPostForm onSubmit={onAddPost}/>
                <div>
                    New post
                </div>
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        </div>
    )
});


export default MyPosts;
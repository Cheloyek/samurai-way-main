import React from "react";
import s from './MyPosts.module.css'
import Post, {PostPropsType} from "./Post/Post";
import {PostType} from "../../../redux/store";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";

//4
export type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: {type: string}) => void
}

// props из app -> profile передается в MyPosts
const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map((p: PostType) => <Post message={p.message} likesCount={p.likesCount}/>)

    //React.createRef() - создается ссылка на элемент textarea
    let newPostElement: any = React.createRef()

    //callback функция при нажатии на кнопку Add post, обращается к newPostElement считывает current.value
    const addPost = () => {
        // let text = newPostElement.current.value - отправляет значение при нажатии, но тк это значение уже есть в
        // state.newPostText

        props.dispatch(addPostActionCreator())

        //props.addPost() - заменили на dispatch
        //очищает textarea после добавления post (после нажатия кнопки Add post)
        // newPostElement.current.value = ''
    }

    // срабатывает когда пытаемся изменить textarea
    let onPostChange = () => {
        let text = newPostElement.current.value     // текст который вводится в textarea
        // console.log(text)
        //props.updateNewPostText(text)
        let action = (updateNewPostTextActionCreator(text))
        props.dispatch(action)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/> {/*value получает значение newPostText*/}
                </div>
                <div>
                    <button className={s.button} onClick={addPost}>Add post</button>
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
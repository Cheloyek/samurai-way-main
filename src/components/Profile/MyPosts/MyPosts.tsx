import React from "react";
import s from './MyPosts.module.css'
import Post, {PostPropsType} from "./Post/Post";
import {Field, reduxForm} from "redux-form";

export type PostType = {
    id: number
    message: string
    likesCount: string
}

//4
export type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText?: string
    // dispatch: (action: {type: string}) => void
    addPost: any
    updateNewPostText: (text: string) => void
}

// props из app -> profile передается в MyPosts
const MyPosts = (props: any) => {
    let postsElements = props.posts.map((p: PostType) => <Post message={p.message} likesCount={p.likesCount}/>)

    //React.createRef() - создается ссылка на элемент textarea
    let newPostElement: any = React.createRef()

    //callback функция при нажатии на кнопку Add post, обращается к newPostElement считывает current.value
    const onAddPost = (values: any) => {
        // let text = newPostElement.current.value - отправляет значение при нажатии, но тк это значение уже есть в
        // state.newPostText

        // props.dispatch(addPostActionCreator())

        props.addPost(values.newPostText) // заменили на dispatch
        //очищает textarea после добавления post (после нажатия кнопки Add post)
        // newPostElement.current.value = ''
    }

    // срабатывает когда пытаемся изменить textarea
    // let onPostChange = () => {
    //     let text = newPostElement.current.value     // текст который вводится в textarea
    //     // console.log(text)
    //     props.updateNewPostText(text)
    //     // let action = (updateNewPostTextActionCreator(text))
    //     // props.dispatch(action)
    // }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                {/*<div>*/}
                {/*    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/> /!*value получает значение newPostText*!/*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <button className={s.button} onClick={onAddPost}>Add post</button>*/}
                {/*</div>*/}
                <AddNewPostFormRedux onSubmit={onAddPost}/>
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

const AddNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={'textarea'}/>
            </div>
            <div>
                <button className={s.button}>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({
    form: 'ProfileAddNewPostForm'
})(AddNewPostForm)

export default MyPosts;
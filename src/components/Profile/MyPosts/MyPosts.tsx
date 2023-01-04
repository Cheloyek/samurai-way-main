import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

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
const MyPosts = React.memo((props: any) => {
    let postsElements = [...props.posts].reverse().map((p: PostType) => <Post message={p.message} likesCount={p.likesCount}/>)

    //React.createRef() - создается ссылка на элемент textarea
    let newPostElement: any = React.createRef()

    //callback функция при нажатии на кнопку Add post, обращается к newPostElement считывает current.value
    const onAddPost = (values: any) => {
        props.addPost(values.newPostText) // заменили на dispatch
        //очищает textarea после добавления post (после нажатия кнопки Add post)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
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
});

const maxLength10 = maxLengthCreator(10)

const AddNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={Textarea} validate={[required, maxLength10]} placeholder={'Post message'}/>
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
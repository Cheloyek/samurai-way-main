import React from "react";
import s from './Post.module.css'

const Post = (props: any) => {


    return (
        <div className={s.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWTNABIQRWeG_2QrZG-bg5g61ZgBytCh923w&usqp=CAU"
                alt=""/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post;
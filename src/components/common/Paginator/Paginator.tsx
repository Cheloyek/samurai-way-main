import React from "react";
import styles from "./Paginator.module.css";

type UserPhotoType = {
    small: string | null
    large: string | null
}

type UserType = {
    followed: boolean
    id: number
    name: string
    photos: UserPhotoType
    status: string | null
    uniqueUrlName: string | null
}

export type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void

}

let Paginator = (props: PaginatorPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        {pages.map((p) => {
            // @ts-ignore
            return <span className={props.currentPage === p && styles.selectedPage}
                         onClick={(e) => {
                             props.onPageChanged(p)
                         }}>{p}-</span>
        })}
    </div>

}

export default Paginator
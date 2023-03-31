import React, {useState} from "react";
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
    totaItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number

}

let Paginator = (props: PaginatorPropsType) => {

    let pagesCount = Math.ceil(props.totaItemsCount / props.pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = portionNumber * props.portionSize

    return <div>
        {portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button>}
        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
            // @ts-ignore
            return <button className={props.currentPage === p && styles.selectedPage}
                         onClick={(e) => {
                             props.onPageChanged(p)
                         }}>{p}</button>
        })}
        {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
    </div>

}

export default Paginator
import React, {useState} from "react";
import styles from "./Paginator.module.css";

// type UserPhotoType = {
//     small: string | null
//     large: string | null
// }

// type UserType = {
//     followed: boolean
//     id: number
//     name: string
//     photos: UserPhotoType
//     status: string | null
//     uniqueUrlName: string | null
// }

type PropsType = {
    totaItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

let Paginator: React.FC<PropsType> = ({totaItemsCount, pageSize, currentPage, onPageChanged, portionSize}) => {
    let pagesCount = Math.ceil(totaItemsCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div>
        {portionNumber > 1 && <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>Prev</button>}
        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <button className={currentPage === p ? styles.selectedPage : ''}
                               onClick={(e) => {
                                   onPageChanged(p)
                               }}>{p}</button>
            })}
        {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
    </div>

}

export default Paginator
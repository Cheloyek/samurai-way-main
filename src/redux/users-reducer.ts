

export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}
export type LocationType = {
    city: string
    country: string
}

export type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

// export type ActionProfileReducerPropsType = {
//     type: string
//     newText: string
// }

export type ActionType = {
    type: string
    userId: any
    users: Array<UserType>
    currentPage: number
    count: number
}

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENTS_PAGE = 'SET_CURRENTS_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'

//значение по умолчанию
let initialState: InitialStateType = {
    users: [
        // {id: 1, photoUrl: "https://mykaleidoscope.ru/uploads/posts/2022-08/1659724523_66-mykaleidoscope-ru-p-domik-v-gorakh-u-ozera-dizain-krasivo-foto-68.jpg" , followed: true, fullName: 'Dmitry', status: 'Good', location: {city: "Prague", country: "Czech"}},
        // {id: 2, photoUrl: "https://mykaleidoscope.ru/uploads/posts/2022-08/1659724523_66-mykaleidoscope-ru-p-domik-v-gorakh-u-ozera-dizain-krasivo-foto-68.jpg", followed: false, fullName: 'Dmitry', status: 'Good', location: {city: "Moscow", country: "Russia"}},
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
}

const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u: any) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u: any) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users     //добавит к users пришедшие с сервера
            }
        case SET_CURRENTS_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state, totalUsersCount: action.count
            }
        }

        default:
            return state
        }

}

export const followAC = (userId: number) => ({type: FOLLOW, userId})
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId})
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users})
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENTS_PAGE, currentPage})
export const setUsersTotalCountAC = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})

export default usersReducer;
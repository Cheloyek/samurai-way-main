import axios from "axios";

const instance = axios.create({
        withCredentials: true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers: {
            'API-KEY': '34d100b8-894d-4061-9da0-9a27cb217fe9'
        }
    }
)

export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    getMe () {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    getProfile (userId: string) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
    follow (userId: number) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    unfollow (userId: number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
}

// export const getUsers = (currentPage: number = 1, pageSize: number) => {
// //     return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, {
// //         withCredentials: true,
// //     })
// //         .then(response => {
// //             return response.data
// //         })
// // }
// //     return instance.get(baseUrl + `users?page=${currentPage}&count=${pageSize}`)
//     return instance.get(`users?page=${currentPage}&count=${pageSize}`)
//         .then(response => {
//             return response.data
//         })
// }
//
// export const getMe = () => {
//     return instance.get(`auth/me`)
//         .then(response => {
//             return response.data
//         })
// }
//
// export const getProfile = (userId: string) => {
//     return instance.get(`profile/${userId}`)
//         .then(response => {
//             return response.data
//         })
// }


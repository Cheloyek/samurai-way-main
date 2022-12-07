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
    getProfile (userId: string) {
        console.log('Please use ProfileAPI object')
        return profileAPI.getProfile(userId)
            // .then(response => {
            //     return response.data
            // })
    },
    follow (userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow (userId: number) {
        return instance.delete(`follow/${userId}`)
    }
}

export const profileAPI = {
    getProfile (userId: string) {
        return instance.get(`profile/${userId}`)
            // .then(response => {
            //     return response.data
            // })
    },
    getStatus (userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus (status: string) {
        return instance.put(`profile/status`, {status: status})
    }
}

export const authAPI = {
    getMe () {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            })
    },
}

// export const loginAPI = {
//     getLogin (email: string, password: string, rememberMe: boolean, captcha: boolean) {
//         return instance.post(`auth/login`)
//             .then(response => {
//                 return response.data
//             })
//     },
// }

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


import axios from "axios";


export const getUsers = (currentPage: number = 1, pageSize: number) => {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, {
        withCredentials: true,
    })
        .then(response => {
            return response.data
        })
}

export const getMe = () => {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true
    })
        .then(response => {
            return response.data
        })
}

export const getProfile = (userId: string) => {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        .then(response => {
            return response.data
        })
}
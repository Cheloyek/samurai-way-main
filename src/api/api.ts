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
    },
    getStatus (userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus (status: string) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto (photo: any) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile (profile: any) {
        return instance.put(`profile`, profile)
    }
}

export const authAPI = {
    getMe () {
        return instance.get(`auth/me`)
    },
    login (email: string, password: any, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logOut () {
        return instance.delete(`auth/login`)
    },
}

export const securityAPI = {
    getCaptchaUrl () {
        return instance.get(`security/get-captcha-url`)
    }
}

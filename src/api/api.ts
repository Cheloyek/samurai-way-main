import axios from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
        withCredentials: true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers: {
            'API-KEY': '34d100b8-894d-4061-9da0-9a27cb217fe9'
        }
    }
)


type MeResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: string[]
}
type LoginResponseType = {
    data: {userId: number}
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: string[]
}
export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    getProfile (userId: string) {
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
        return instance.put(`profile/status`, {status})
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
    saveProfile (profile: ProfileType) {
        return instance.put(`profile`, profile)
    }
}

export const authAPI = {
    getMe () {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    login (email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
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

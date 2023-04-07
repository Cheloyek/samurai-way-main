import {instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./api";

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}
type LoginResponseDataType = {userId: number}

export const authAPI = {
    getMe() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logOut() {
        return instance.delete(`auth/login`)
    },
}
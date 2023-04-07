import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
        withCredentials: true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers: {
            'API-KEY': '34d100b8-894d-4061-9da0-9a27cb217fe9'
        }
    }
)


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: string[]
}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: string[]
}
type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: string[]
}
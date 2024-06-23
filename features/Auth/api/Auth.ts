import AbstractApi from '@shared/api/AbstractApi'
import LoginData from '@features/Auth/model/LoginData'
import { profile } from '@features/Auth/model/Profiel'
import { LocalStorageKeys } from '@shared/const'
import type { User } from '@entities/user/model/User'

const TOKENS_KEY = LocalStorageKeys.TOKENS
// const USER_KEY = LocalStorageKeys.USER

export class Auth extends AbstractApi {
    private tokens = {
        accessToken: '',
        refreshToken: ''
    }

    profile = profile

    updateTokens (newAccessToken: string, newRefreshToken: string) {
        this.tokens.accessToken = newAccessToken
        this.tokens.refreshToken = newRefreshToken
        localStorage.setItem(TOKENS_KEY, JSON.stringify(this.tokens))
    }

    tokensClean () {
        localStorage.removeItem(TOKENS_KEY)
        this.tokens.accessToken = ''
        this.tokens.refreshToken = ''
    }

    getTokens () {
        const tokensStr = localStorage.getItem(TOKENS_KEY)
        if (tokensStr) {
            return JSON.parse(tokensStr)
        }

        return ''
    }

    async signIn (loginInputData: LoginData) {
        if (loginInputData.isContainsValues()) {
            this.profile.setAuthData(loginInputData)
            try {
                const response = await this.axiosInstance.post('/auth/signin', {
                    ...loginInputData
                })

                if (response.data?.data?.accessToken) {
                    this.updateTokens(
                        response.data.data.accessToken,
                        response.data.data.refreshToken
                    )

                    // const userInfo = await this.axiosInstance.post(
                    //     '/auth/getUserFromToken',
                    //     {
                    //         ...this.getTokens()
                    //     }
                    // )

                    // FIXME: поменять условие сохранения, если вообще нужно сохранять
                    // if (userInfo.data.isResultSuccess) {
                    //     localStorage.setItem(USER_KEY, JSON.stringify(userInfo.data.data));
                    // }
                    return Promise.resolve(response.data.statusCode)
                }

                return Promise.reject(new Error('Токен не найден в ответе от сервера'))
            } catch (error: any) {
                return Promise.reject(error.response?.status)
            }
        } else {
            return Promise.reject(
                new Error('Форма авторизации должна содержать данные')
            )
        }
    }

    async signUp (userData: User) {
        try {
            const res = await this.axiosInstance.post('signup', userData)
            return res.data
        } catch (e) {
            console.log('SignUp error: ', e)
        }
    }
}

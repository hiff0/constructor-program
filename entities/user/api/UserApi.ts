// import { plainToInstance } from 'class-transformer'
import AbstractApi from '@/shared/api/AbstractApi'
import type { User } from '@/entities/user/model/User'

// TODO: Удалить, т.к. данные api методы реализованы в Auth
export class UserApi extends AbstractApi {
    async signUp (userData: User) {
        try {
            const res = await this.axiosInstance.post('signup', userData)
            return res.data
        } catch (e) {
            console.log('SignUp error: ', e)
        }
    }

    async signIn ({ email, password }: { email: string; password: string }) {
        try {
            const res = await this.axiosInstance.post('signin', { email, password })
            return res.data
        } catch (e) {
            console.log('SignIn error: ', e)
        }
    }
}

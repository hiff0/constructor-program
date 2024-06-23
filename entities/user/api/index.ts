import { UserApi } from '@entities/user/api/UserApi'

const userApi = new UserApi()
export const useUserApi = () => userApi

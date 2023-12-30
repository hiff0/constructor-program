import type { Auth } from '~/interfaces'

const auth: Auth = {
    isAuthenticated: false
}

export const useUserAuth = () => useState<Auth>('auth', () => auth)

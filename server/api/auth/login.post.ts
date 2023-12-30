import zod from 'zod'
import jwt from 'jsonwebtoken'

const refreshTokens: Record<number, Record<string, any>> = {}
export const SECRET = 'dummy'

export default eventHandler(async (event) => {
    const body = await readBody(event)
    const result = zod.object({
        login: zod.string().min(1),
        password: zod.literal('admin')
    }).safeParse(body)
    if (!result.success) {
        throw createError({ statusCode: 403, statusMessage: 'Unauthorized, hint: try `admin` as password' })
    }

    const expiresIn = 15
    const refreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
    const { login } = result.data
    const user = {
        login,
        name: 'User ' + login
    }

    const accessToken = jwt.sign({
        ...user,
        scope: ['test', 'user']
    }, SECRET, { expiresIn })

    refreshTokens[refreshToken] = {
        accessToken,
        user
    }

    return {
        token: {
            accessToken,
            refreshToken
        }
    }
})

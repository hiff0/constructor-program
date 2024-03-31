import { IUserDocument, User } from '@/server/models/User'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const body: IUserDocument = await readBody(event)

    if (!body.login || !body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad request',
            message: 'Missing required fields'
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(body.password, salt)
    return await User.create({
        login: body.login,
        password: hashPassword
    })
})

import { model, Schema } from 'mongoose'

export interface IUserDocument {
    login: string;
    password: string;
    email?: string;
}

const UserSchema = new Schema<IUserDocument>({
    login: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        length: [6, 'Пароль должен быть больше 6 символов']
    }
})

export const User = model<IUserDocument>('User', UserSchema)

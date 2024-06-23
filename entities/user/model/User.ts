// import { Expose } from 'class-transformer'

// TODO: справить правило в линтере, которое ругается на кол-во пробелов
// TODO: Возможно заменить на класс и использовать class-transformer
// export class User {
//     @Expose() id!: number
//     @Expose() email!: string
//     @Expose() password!: string
// }

export interface User {
    id?: number;
    email: string;
    password: string;
}

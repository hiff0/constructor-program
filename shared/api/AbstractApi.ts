import { Axios } from 'axios'
import axiosApiInstance from '@shared/api/axiosInstance'

export default abstract class AbstractApi {
    axiosInstance!: Axios

    constructor (axiosInstance: Axios = axiosApiInstance) {
        this.axiosInstance = axiosInstance
    }
}

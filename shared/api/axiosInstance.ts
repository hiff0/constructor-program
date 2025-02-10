import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 1000 * 3,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

export default axiosInstance

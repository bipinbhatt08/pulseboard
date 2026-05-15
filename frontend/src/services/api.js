import axios from 'axios'
import { tokenStore } from './tokenStore.js'
import { authService } from './authService.js'

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`
export const api = axios.create({
    baseURL: BASE_URL,
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials: true
})
api.interceptors.request.use((config)=>{
    const token = tokenStore.getAccess()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

 api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/refresh'
    ) {
      originalRequest._retry = true

      const { accessToken } = await authService.refresh()
      tokenStore.set(accessToken) 

      originalRequest.headers.Authorization =
        `Bearer ${accessToken}`

      return api(originalRequest)
    }

    return Promise.reject(error)
  }
)
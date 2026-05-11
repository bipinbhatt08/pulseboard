import axios from 'axios'
import { tokenStore } from './tokenStore'

const BASE_URL = import.meta.VITE_BACKEND_URL || 'http://localhost:5011/api'
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
    (response)=>response, // simply pass the error-free response
    async (error) => {
        if(error.response?.status === 401 && !error.config._retry){
            //What if refresh request also returns 401?
            //Then interceptor again tries refresh → infinite loop.
            error.config._retry = true
          const {accessToken} = await authService.refresh()
        // error.config is the original request config that is failed
          error.config.headers.Authorization = `Bearer ${accessToken}`
        
          // send reqauest again

          return api(error.config)
        }
        
    return Promise.reject(error)
    }
)
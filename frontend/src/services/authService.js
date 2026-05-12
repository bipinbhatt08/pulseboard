import { api } from "./api.js";
import { tokenStore } from "./tokenStore.js";

export const authService = {


    async register({email,name,password}){
        const {data} = await api.post('/auth/register',{name,email,password})
        tokenStore.set(data.data)
        return data
    },
    async login({email,password}){
        const {data} = await api.post('/auth/login',{email,password})
        tokenStore.set(data.data)
        return data
    },
    async logout(){
        await api.post('/auth/logout')
        tokenStore.clear()
    },
    async getProfile(){
        const {data} = await api.get('/auth/me')
        return data.data.user
    },
    async refresh(){
        const {data} = await api.post('/auth/refresh',{refreshToken:tokenStore.getRefreshKey()})
        tokenStore.set(data.data)
        return  data
    },
    async verifyEmail(token){
        const {data} = await api.get(`/auth/verify-email/${token}`)
        return data.data
    }
}
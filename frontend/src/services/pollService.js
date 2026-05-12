import { api } from "./api.js"
import { tokenStore } from "./tokenStore.js"
export const pollService = {
    async createPoll({title,durationUnit,durationValue,allowAnonymousResponse}){
        const {_id} = tokenStore.getUser()
        const {data} = await api.post('/poll',{user:_id,title,durationUnit,durationValue,allowAnonymousResponse})
        return data
    }
}
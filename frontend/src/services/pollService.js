import { api } from "./api.js"
import { tokenStore } from "./tokenStore.js"
export const pollService = {
    
    async createPoll({title,durationUnit,durationValue}){
        const {_id} = tokenStore.getUser()
        const {data} = await api.post('/poll',{user:_id,title,durationUnit,durationValue})
        return data
    }
}
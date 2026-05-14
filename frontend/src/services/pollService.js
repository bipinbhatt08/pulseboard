import { api } from "./api.js"
import { tokenStore } from "./tokenStore.js"

export const pollService = {
    async createPoll({title,durationUnit,durationValue,allowAnonymousResponse}){
        const {_id} = tokenStore.getUser()
        const {data} = await api.post('/polls',{user:_id,title,durationUnit,durationValue,allowAnonymousResponse})
        return data
    },
   async getAllPoll({ offset = 0, limit = 9, filter = 'all' } = {}) {
    const { data } = await api.get(`/polls?offset=${offset}&limit=${limit}&filter=${filter}`)
    return data
},
    async getPollWithQuestions (id){
        const {data} = await api.get(`/polls/${id}`)
        return data
    },
    async getPollAnylytics (id){
        const {data} = await api.get(`/polls/${id}/analytics`)
        return data
    },
    async publishPoll(id){
        const {data} = await api.patch(`/polls/${id}/publish`)
        return data
    },
    async getMyPolls({ offset = 0, limit = 10 } = {}) {
    const { data } = await api.get(`/polls/my-polls?offset=${offset}&limit=${limit}`)
    return data
}
}

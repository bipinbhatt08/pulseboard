import { api } from "./api.js"
export const questionService = {
    
    async addQuestion({text,poll}){
        const {data} = await api.post(`/questions`,{text:text,poll})
        return data
    },
    async getQuestionById(id){
        const {data} = await api.get(`/questions/${id}`)
        return data
    },
    async getquestionsBypoll(pollId){
        const {data} = await api.get(`/questions/poll/${pollId}`)
        return data
    }
}
import { api } from "./api.js"
export const questionService = {
    
    async addQuestion({text,poll}){
        const {data} = await api.post(`/poll/${poll}/question`,{text:text,poll})
        return data
    }
}
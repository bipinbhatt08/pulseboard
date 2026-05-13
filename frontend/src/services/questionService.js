import { api } from "./api.js"
export const questionService = {
    
    async addQuestion({question,pollId}){
        const {data} = await api.post('/poll/${pollId}/question',{text:question,poll:pollId})
        return data
    }
}
import { api } from "./api.js"

export const optionService = {
    async createOption({ text, question }) {
        const { data } = await api.post(`/options`, { text, question })
        return data
    },
    async getOptionsByQuestion({}){
        const {data} = await api.get(`/options/questions/:${questionId}`)
        return data
    },
    async getOptionById(id){
        const {data} = await api.get(`/options/${id}`)
        return data
    }
}
import { api } from "./api.js"

export const optionService = {
    async createOption({ text, question }) {
        const { data } = await api.post(`/questions/${question}/options`, { text, question })
        return data
    }
}
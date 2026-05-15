import { api } from "./api.js";

export const voteService = {
    async casteVote({poll, question, option, anonymousId }){
        
        const {data} = await api.post('/votes',{poll, question, option, anonymousId })
        return data
    },
    async getVotesByPoll(pollId){
        const {data} = await api.get(`/votes/poll/${pollId}`)
        return data
    },
    async getVoteCount(){
        const {data} = await api.get('./votes/count')
        return data
    }
}
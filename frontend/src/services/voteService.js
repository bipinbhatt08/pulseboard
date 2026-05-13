import { api } from "./api.js";

export default voteService = {
    async casteVote(){
        const {data} = await api.post('/votes',{poll, question, option, anonymousId })
        return data
    },
    async getVotesByPoll(pollId){
        const {data} = await api.get(`/votes/poll/${pollId}`)
        return data
    }
}
import * as voteService from './vote.service.js'
import ApiResponse from '../../common/utils/api-response.js'

export const castVote = async (req, res) => {
    const { poll, question, option, anonymousId } = req.body
    const user = req.user?.id  // optional — may not be logged in

    const vote = await voteService.castVote({ poll, question, option, user, anonymousId })
    ApiResponse.created(res, "Vote cast successfully", vote)
}

export const getVotesByPoll = async (req, res) => {
    const { pollId } = req.params
    const votes = await voteService.getVotesByPoll(pollId)
    ApiResponse.success(res, "Votes fetched successfully", votes)
}
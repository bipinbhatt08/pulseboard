
import ApiResponse from '../../common/utils/api-response.js'
import * as pollService from './poll.service.js'

const createPoll = async(req,res) =>{
    const {title,durationValue,durationUnit,allowAnonymousResponse} = req.body
    
    const user = req.user
    const poll = await pollService.createPoll({title,durationUnit,durationValue,user:user.id,allowAnonymousResponse})
    ApiResponse.created(res,"Poll created successfully.",poll)
}

const getAllPolls = async (req, res) => {
    const { offset = 0, limit = 10 } = req.query
    const { polls, total } = await pollService.getAllPolls({ offset: Number(offset), limit: Number(limit) })
    ApiResponse.success(res, "Polls fetched successfully", { polls, total })
}

const getPollWithQuestions = async (req, res) => {
    const { pollId } = req.params
    const poll = await pollService.getPollWithQuestions(pollId)
    ApiResponse.success(res, "Poll fetched successfully", poll)
}

const getPollAnalytics = async (req, res) => {
    const { pollId } = req.params
    const analytics = await pollService.getPollAnalytics(pollId)
    ApiResponse.success(res, "Analytics fetched successfully", analytics)
}

const publishPoll = async (req, res) => {
    const { pollId } = req.params
    const poll = await pollService.publishPoll(pollId, req.user.id)
    ApiResponse.success(res, "Poll published successfully", poll)
}

export {createPoll,getAllPolls,getPollAnalytics,getPollWithQuestions,publishPoll}
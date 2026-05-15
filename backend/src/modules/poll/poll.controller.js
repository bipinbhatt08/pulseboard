
import ApiError from '../../common/utils/api-error.js'
import ApiResponse from '../../common/utils/api-response.js'
import * as pollService from './poll.service.js'

const createPoll = async(req,res) =>{
    const {title,durationValue,durationUnit,allowAnonymousResponse} = req.body
    
    const user = req.user
    const poll = await pollService.createPoll({title,durationUnit,durationValue,user:user.id,allowAnonymousResponse})
    ApiResponse.created(res,"Poll created successfully.",poll)
}

const getAllPolls = async (req, res) => {
    const { offset = 0, limit = 10, filter='all'} = req.query
    const { polls, total } = await pollService.getAllPolls({
        offset: Number(offset),
        limit: Number(limit),
        filter
    })
    ApiResponse.ok(res, "Polls fetched successfully", { polls, total })
}

const getPollWithQuestions = async (req, res) => {
    const { pollId } = req.params
    const poll = await pollService.getPollWithQuestions(pollId)
    ApiResponse.ok(res, "Poll fetched successfully", poll)
}

const getPollAnalytics = async (req, res) => {
    const { pollId } = req.params

    const poll = await pollService.getPollById(pollId)
    
    if (!poll) throw ApiError.notfound("Poll not found")
    
    // only allow if published OR if user is the owner
    const isOwner = req.user?.id && poll.user.toString() === req.user.id.toString()
    
    if (!poll.isPublished && !isOwner) {
        throw ApiError.forbidden("Analytics not available yet")
    }

    const analytics = await pollService.getPollAnylytics(pollId)
    ApiResponse.ok(res, "Analytics fetched successfully", analytics)
}

const publishPoll = async (req, res) => {
    const { pollId } = req.params
    const poll = await pollService.publishPoll(pollId, req.user.id)
    ApiResponse.ok(res, "Poll published successfully", poll)
}
const getPollsByUserId = async (req, res) => {

    const userId= req.user.id

    const {offset = 0,limit = 10} = req.query

    const { polls, total } =
        await pollService.getPollsByUserId(
            userId,
            {
                offset: Number(offset),
                limit: Number(limit)
            }
        )

    ApiResponse.ok(
        res,
        "User polls fetched successfully",
        { polls, total }
    )
}
export {createPoll,getAllPolls,getPollAnalytics,getPollWithQuestions,publishPoll,getPollsByUserId}
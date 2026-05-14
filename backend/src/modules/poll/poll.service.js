import Poll from './poll.model.js'
import * as questionService from '../question/question.service.js'
import * as voteService from '../vote/vote.service.js'
import * as optionService from '../option/option.service.js'
import ApiError from '../../common/utils/api-error.js'

const createPoll = async({user,title,durationUnit,durationValue,allowAnonymousResponse}) => {

    const multipliers = {
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000
    }
    
    const expiresAt = new Date(
    Date.now() +
    durationValue * multipliers[durationUnit]
    )

    const poll = await Poll.create({user,expiresAt,title,allowAnonymousResponse})

    return poll
}
const getPollById = async(id) =>{
    const poll = await Poll.findById(id)
    if(!poll) return null
    return poll
}
const getAllPolls = async ({ offset = 0, limit = 10 } = {}) => {
    const [polls, total] = await Promise.all([
        Poll.find()
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .lean(),
        Poll.countDocuments()
    ])
    return { polls, total }
}


const getPollWithQuestions = async (id) => {
    const poll = await Poll.findById(id).lean()
    if (!poll) throw ApiError.notfound("Poll not found")

    if (new Date() > new Date(poll.expiresAt)) {
        throw ApiError.badRequest("Poll has expired")
    }

    const questions = await questionService.getQuestionsByPoll(id)

    const questionsWithOptions = await Promise.all(
        questions.map(async (q) => ({
            ...q,
            options: await optionService.getOptionsByQuestion(q._id)
        }))
    )

    return { ...poll, questions: questionsWithOptions }
}

const getPollAnylytics = async(pollId) =>{

    const votes = await voteService.getVotesByPoll(pollId)

    const totalVotes = votes.length
    const authenticatedVotes= votes.filter((voter)=>voter.user).length
    const annonymousVotes = totalVotes - authenticatedVotes


    const questions = await questionService.getQuestionsByPoll(pollId)

    // get options

    const questionWithStats =  await Promise.all(questions.map( async(q)=>{
        {
            const options = await optionService.getOptionsByQuestion(q._id)

            //findinding votes for the question
            const questionVotes = votes.filter(v => v.question.toString() === q._id.toString())

            //total votes for that question
            const totalQuestionVotes = questionVotes.length


            //
            const optionsWithStats = options.map(opt => {
                const optionVotes = questionVotes.filter(v => v.option.toString() === opt._id.toString())
                const authenticatedVotes = optionVotes.filter(v => v.user).length
                const anonymousVotes = optionVotes.length - authenticatedVotes

                return {
                    optionId: opt._id,
                    optionText: opt.text,
                    votes: optionVotes.length,
                    authenticatedVotes,
                    anonymousVotes,
                    percentage: totalQuestionVotes === 0
                        ? 0
                        : Math.round((optionVotes / totalQuestionVotes) * 1000) / 10
                }
            })
            return {
                questionId: q._id,
                questionText: q.text,
                totalVotes: totalQuestionVotes,
                options: optionsWithStats
            }

        }
    }))

    return {
        totalVotes,
        authenticatedVotes,
        annonymousVotes,
        questions: questionWithStats
    }
}


const publishPoll = async (id, userId) => {
    const poll = await Poll.findById(id)
    if (!poll) throw ApiError.notfound("Poll not found")
    if (poll.user.toString() !== userId.toString()) throw ApiError.forbidden("You are not authorized")
    poll.published = true
    await poll.save()
    return poll
}

export {createPoll,getPollById,getAllPolls,getPollWithQuestions,getPollAnylytics,publishPoll}
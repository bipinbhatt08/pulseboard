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
const getAllPolls = async ({ offset = 0, limit = 10, filter = 'all'} = {}) => {
    const query = {}


    // filter by status
    if (filter === 'active') {
        query.expiresAt = { $gt: new Date() }
    } else if (filter === 'expired') {
        query.expiresAt = { $lte: new Date() }
    } else if (filter === 'published') {
        query.isPublished = true
    }else if(filter === 'annonymous'){
        query.allowAnonymousResponse = true
    }else if(filter === 'authenticated'){
        query.allowAnonymousResponse = false
    }

    const [polls, total] = await Promise.all([
        Poll.find(query)
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .populate('user', 'name')
            .lean(),
        Poll.countDocuments(query)
    ])

    return { polls, total }
}


const getPollWithQuestions = async (id) => {
    const poll = await Poll.findById(id).lean()
    if (!poll) throw ApiError.notfound("Poll not found")

    

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
            const questionVotes = votes.filter(v => v.question._id.toString() === q._id.toString())

            //total votes for that question
            const totalQuestionVotes = questionVotes.length


            //
            const optionsWithStats = options.map(opt => {
                const optionVotes = questionVotes.filter(v => v.option._id.toString() === opt._id.toString())
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
                        : Math.round((optionVotes.length / totalQuestionVotes) * 1000) / 10
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
    poll.isPublished = true
    await poll.save()
    return poll
}


const getPollsByUserId = async (userId,{ offset = 0, limit = 10 } = {}) => {

    const [polls, total] = await Promise.all([

        Poll.find({ user: userId })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .lean(),

        Poll.countDocuments({ user: userId })

    ])
    return {
        polls,
        total
    }
}

export {createPoll,getPollById,getAllPolls,getPollWithQuestions,getPollAnylytics,publishPoll,getPollsByUserId}
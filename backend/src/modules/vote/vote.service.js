import mongoose from 'mongoose'
import Vote from './vote.model.js'
import * as optionService from '../option/option.service.js'
import ApiError from '../../common/utils/api-error.js'
import * as pollService from '../poll/poll.service.js'
import * as questionService from '../question/question.service.js'

export const castVote = async ({ poll, question, option, user, anonymousId }) => {


   // in this check if poll exist , question exist option exist and poll is not expired

    const pollExists = await pollService.getPollById(poll)
    if (!pollExists) throw ApiError.notfound("Poll not found")

    if (new Date() > new Date(pollExists.expiresAt)) {
        throw ApiError.badRequest("Poll has expired, no longer accepting votes")
    }

    const questionExists = await questionService.getQuestionById(question)
    if (!questionExists) throw ApiError.notfound("Question not found")

    const optionExists = await optionService.getOptionById(option)
    if (!optionExists) throw ApiError.notfound("Option not found")

   
    if (optionExists.question.toString() !== question.toString()) {
        throw ApiError.badRequest("Option does not belong to this question")
    }



    // 1. check if already voted
    const alreadyVoted = await Vote.findOne(
        user ? { user, question } : { anonymousId, question }
    )
    if (alreadyVoted) throw ApiError.conflict("You have already voted on this question")

    
    // 2. create vote + increment count atomically
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const vote = await new Vote({ poll, question, option, user, anonymousId }).save({ session })
        await optionService.incrementVoteCount(option, session)
        await session.commitTransaction()
        return vote
    } catch (err) {
        await session.abortTransaction()
        throw err
    } finally {
        session.endSession()
    }
}

export const getVotesByPoll = async (pollId) => {
    const votes = await Vote.find({ poll: pollId })
        .populate('question', 'text')
        .populate('option', 'text voteCount')
        .lean()
    return votes
}
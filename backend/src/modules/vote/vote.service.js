import mongoose from 'mongoose'
import Vote from './vote.model.js'
import * as optionService from '../option/option.service.js'
import ApiError from '../../common/utils/api-error.js'

export const castVote = async ({ poll, question, option, user, anonymousId }) => {

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
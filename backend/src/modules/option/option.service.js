import ApiError from '../../common/utils/api-error.js'
import * as questionService from '../question/question.service.js'
import * as pollService from '../poll/poll.service.js'
import Option from './option.model.js'

export const createOption = async({question,text,user}) =>{
    const questionExist = await questionService.questionExists(question)
    if(!questionExist) throw ApiError.badRequest("No such question exists")

    const poll = await pollService.getPollById(questionExist.poll)

    if (!poll) {
        throw ApiError.badRequest("Poll not found")
    } 
    if(poll.user.toString() !== user.toString()){
        throw ApiError.forbidden("You are not permitted")
    }
    const option = await Option.create({question,text})
    
    return option
}
export const incrementVoteCount = async (optionId,session=null) => {
    const option = await Option.findByIdAndUpdate(
        optionId,
        { $inc: { voteCount: 1 } },
        { new: true,session },
    )
    if (!option) throw ApiError.notfound("Option not found")
    return option
}
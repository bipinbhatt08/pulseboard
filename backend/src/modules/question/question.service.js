import Question from './question.model.js'
import * as pollService from '../poll/poll.service.js'
import ApiError from '../../common/utils/api-error.js'


export const addQuestion = async({poll,text,userId})=>{
    
    /**
     * check if poll exists if not  throw error
     * check if that user is owner of that poll poll
     * if not throw api error again
     */

    const pollExists = await pollService.getPollById(poll)
    if(!pollExists) throw  ApiError.notfound("Poll does not exist")
    
    if(pollExists.user.toString() !== userId.toString()) throw  ApiError.forbidden("You are not authorized to perform this aciton. ")

    const question = await Question.create({poll,text})

    return question

}

export const questionExists = async(id)=>{
    return await Question.findById(id).populate('poll')
}
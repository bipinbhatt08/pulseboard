import ApiResponse from '../../common/utils/api-response.js'
import * as questionService from './question.service.js'

export const addQuestion = async(req,res)=>{

    const question = await questionService.addQuestion({
        poll:req.body.poll,
        text: req.body.text,
        userId: req.user.id
    })

    return ApiResponse.created(res, "Question added successfully.",question)
} 

export const getQuestionById = async(req,res)=>{
    const question = await questionService.getQuestionById(req.params.id)
    return ApiResponse.ok(res,"Question fetched successfully",question)
}

export const getQuestionsByPoll = async(req,res)=>{
    const questions = await questionService.getQuestionsByPoll(req.params.id)
    return ApiResponse.ok(res,"Questions fetehed successfully",questions)
}


import ApiResponse from '../../common/utils/api-response.js'
import * as questionService from './question.service.js'

export const addQuestion = async(req,res)=>{

    const question = await questionService.addQuestion({
        poll:req.params.pollId,
        text: req.body.text,
        userId: req.user.id
    })

    ApiResponse.created(res, "Question added successfully.",question)
} 
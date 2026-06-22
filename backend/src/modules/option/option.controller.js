import ApiResponse from '../../common/utils/api-response.js'
import * as optionService from './option.service.js'

export const createOption = async(req,res) =>{
    const user = req.user.id
    const option = await optionService.createOption({...req.body,user})
    return ApiResponse.created(res,"Option created successfully",option)
}
export const getOptionsByQuestion = async (req, res) => {
    const { questionId } = req.params
    const options = await optionService.getOptionsByQuestion(questionId)
    return ApiResponse.ok(res, "Options fetched successfully", options)
}

export const getOptionById = async (req, res) => {
    const { optionId } = req.params
    const option = await optionService.getOptionById(optionId)
    return ApiResponse.ok(res, "Option fetched successfully", option)
}
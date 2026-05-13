import ApiResponse from '../../common/utils/api-response.js'
import * as optionService from './option.service.js'

export const createOption = async(req,res) =>{
    const user = req.user.id
    const option = await optionService.createOption({...req.body,user})
    return ApiResponse.created(res,"Option created successfully",option)
}
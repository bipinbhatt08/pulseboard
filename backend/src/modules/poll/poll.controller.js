
import ApiResponse from '../../common/utils/api-response.js'
import * as pollService from './poll.service.js'
const createPoll = async(req,res) =>{
    const {title,durationValue,durationUnit} = req.body
    
    const user = req.user

    const poll = await pollService.createPoll({title,durationUnit,durationValue,user:user.id})
    ApiResponse.created(res,"Poll created successfully.",poll)
}

export {createPoll}
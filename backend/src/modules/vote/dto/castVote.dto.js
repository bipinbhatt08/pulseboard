import Joi from 'joi'
import BaseDto from '../../../common/dto/base.dto.js'

class CastVoteDto extends BaseDto {
    static schema = Joi.object({
        poll: Joi.string().required(),
        question: Joi.string().required(),
        option: Joi.string().required(),
        anonymousId: Joi.string().optional()
    })
}

export default CastVoteDto
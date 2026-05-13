import Joi from 'joi'
import BaseDto from '../../../common/dto/base.dto.js'

class CreateOptionDto extends BaseDto {
    static schema = Joi.object({
        text: Joi.string().required(),
        question: Joi.string().required()
    })
}

export default CreateOptionDto
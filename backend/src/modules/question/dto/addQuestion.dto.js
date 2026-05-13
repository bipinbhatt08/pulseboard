import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class AddQuestionDto extends BaseDto {
  static schema = Joi.object({
    text: Joi.string().required()
  });
}

export default AddQuestionDto
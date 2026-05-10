import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class CreatePollDto extends BaseDto {
  static schema = Joi.object({
    title: Joi.string().required(),

    durationValue: Joi.number()
      .integer()
      .min(1)
      .required(),

    durationUnit: Joi.string()
      .valid("minutes", "hours", "days")
      .required()
  });
}

export default CreatePollDto
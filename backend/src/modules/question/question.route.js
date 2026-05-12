import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import validate from "../../common/middleware/validate.middleware.js";
import AddQuestionDto from "./dto/addQuestionDto.js";
import * as controller from './question.controller.js'

const router = Router()

router.post('/:pollId/questions', authenticate, validate(AddQuestionDto), controller.addQuestion)

export default router
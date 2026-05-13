import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import validate from "../../common/middleware/validate.middleware.js";
import AddQuestionDto from "./dto/addQuestion.dto.js";
import * as controller from './question.controller.js'

const router = Router()

router.post('/:pollId/questions', authenticate, validate(AddQuestionDto), controller.addQuestion)
router.get('/question/:id', controller.getQuestionById)

export default router
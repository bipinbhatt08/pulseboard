import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import validate from "../../common/middleware/validate.middleware.js";
import AddQuestionDto from "./dto/addQuestion.dto.js";
import * as controller from './question.controller.js'

const router = Router()


router.post('/', authenticate, validate(AddQuestionDto), controller.addQuestion)
router.get('/:id', controller.getQuestionById)
router.get('/poll/:pollid',controller.getQuestionsByPoll)

export default router
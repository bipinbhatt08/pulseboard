import express from "express"
import validate from "../../common/middleware/validate.middleware.js"
import CreatePollDto from "./dto/createPoll.dto.js"
import { authenticate } from "../auth/auth.middleware.js"
import * as controller from './poll.controller.js'
const router = express.Router()

router.get('/', controller.getAllPolls)
router.get('/my-polls', authenticate, controller.getPollsByUserId)
router.get('/:pollId', controller.getPollWithQuestions)
router.post('/', authenticate, validate(CreatePollDto), controller.createPoll)
router.get('/:pollId/analytics', authenticate, controller.getPollAnalytics)
router.patch('/:pollId/publish', authenticate, controller.publishPoll)

export default router
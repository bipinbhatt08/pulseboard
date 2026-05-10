import express from "express"
import validate from "../../common/middleware/validate.middleware.js"
import CreatePollDto from "./dto/createPoll.dto.js"
import { authenticate } from "../auth/auth.middleware.js"
import * as contoller from './poll.controller.js'
const router = express.Router()

router.post('/',authenticate,validate(CreatePollDto),contoller.createPoll)

export default router
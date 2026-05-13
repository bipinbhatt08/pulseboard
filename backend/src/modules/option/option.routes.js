import { Router } from 'express'
import * as controller from './option.controller.js'
import { authenticate } from '../auth/auth.middleware.js'
import validate from '../../common/middleware/validate.middleware.js'
import CreateOptionDto from './dto/createOption.dto.js'

const router = Router()

router.post('/questions/:questionId/options', authenticate, validate(CreateOptionDto), controller.createOption)
router.get('/questions/:questionId/options', controller.getOptionsByQuestion)
router.get('/questions/:questionId/options/:optionId', controller.getOptionById)

export default router
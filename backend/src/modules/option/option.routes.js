import { Router } from 'express'
import * as controller from './option.controller.js'
import { authenticate } from '../auth/auth.middleware.js'
import validate from '../../common/middleware/validate.middleware.js'
import CreateOptionDto from './dto/createOption.dto.js'

const router = Router()

router.post('/', authenticate, validate(CreateOptionDto), controller.createOption)
router.get('/questions/:questionId', controller.getOptionsByQuestion)
router.get('/:optionId', controller.getOptionById)

export default router
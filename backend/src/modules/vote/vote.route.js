import { Router } from 'express'
import * as controller from './vote.controller.js'
import { authenticate } from '../auth/auth.middleware.js'
import validate from '../../common/middleware/validate.middleware.js'
import CastVoteDto from './dto/castVote.dto.js'

const router = Router()

//todo,, authenticate optionally.. if no token sent let them vote(annonymous)
router.post('/votes', validate(CastVoteDto), controller.castVote)

// only poll creator should see votes
router.get('/polls/:pollId/votes', authenticate, controller.getVotesByPoll)

export default router
import cookieParser from "cookie-parser"
import express from "express"
import authRouter from './modules/auth/auth.routes.js'
import pollRouter from './modules/poll/poll.route.js'
import questionRouter from './modules/question/question.route.js'
import voteRouter from './modules/vote/vote.route.js'
import optionRouter from './modules/option/option.routes.js'

import globalErrorHandler from "./common/middleware/error.middleware.js"
import cors from 'cors'
const app = express()

app.use(cors({
    origin: process.env.CLIENT_ID,
    credentials: true  // needed if you're sending cookies/auth headers
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/polls',pollRouter)
app.use('/api/questions',questionRouter)
app.use('/api/votes',voteRouter)
app.use('/api/options',optionRouter)


app.use(globalErrorHandler)
export default app
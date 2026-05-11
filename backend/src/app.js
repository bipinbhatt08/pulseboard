import cookieParser from "cookie-parser"
import express from "express"
import authRoute from './modules/auth/auth.routes.js'
import pollRoute from './modules/poll/poll.route.js'
import globalErrorHandler from "./common/middleware/error.middleware.js"
import cors from 'cors'
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true  // needed if you're sending cookies/auth headers
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/auth',authRoute)
app.use('/api/poll',pollRoute)


app.use(globalErrorHandler)
export default app
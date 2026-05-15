import "dotenv/config"
import app from "./src/app.js"
import connectDB from "./src/common/config/db.js"
import { createServer } from 'http'
import { initSocket } from "./src/common/config/socket.js"

const PORT = process.env.PORT || 5000

const httpServer = createServer(app)

initSocket(httpServer)

const start = async() => {
    console.log("MONGOGOGOGOGO",process.env.MONGODB_URI)
    //connect to database
    await connectDB()
    httpServer.listen(PORT,()=>{
        console.log(`Server is running at port ${PORT} in ${process.env.NODE_ENV} mode`)

    })
}

start().catch((err)=>{ 
    console.error("Failed to start server.",err)
    process.exit(1)
})



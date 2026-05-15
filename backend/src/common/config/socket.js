import { Server } from 'socket.io'

let io

const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_ID,
            credentials: true
        }
    })

    io.on('connection', (socket) => {
        console.log('client connected:', socket.id)

        socket.on('join:poll', (pollId) => {
            socket.join(pollId)
            console.log(`joined poll room: ${pollId}`)
        })

        socket.on('disconnect', () => {
            console.log('client disconnected:', socket.id)
        })
    })

    return io
}

const getIO = () => {
    if (!io) throw new Error('Socket not initialized')
    return io
}

export { initSocket, getIO }
const express = require('express');
const cors = require('cors');
const router = express()
router.use(express.json())
router.use(cors())
// router.listen((4000), ()=> console.log('http://localhost:4000'))
const routes = require('./routes')
router.use('/', routes)

const { createServer } = require('http');
const {Server} = require('socket.io');
const server = createServer(router);
const io = new Server(server, {
    cors: {
        origin:"*"
    }
})

server.listen((4001), ()=> console.log('http://localhost:4001'))


const users = new Map();

io.use(async(socket, next) => {
    console.log(socket)
    let id = socket.handshake.auth.userId;
    const userDetails = await checkUser(id)
    if(userDetails){
        if(!users.has(id)){
            users.set(id, {
                socketId: [socket.id],
                userId: String(userDetails._id),
                email : userDetails.email,
                status : "online"
            })
        }else{
            users.get(socket.handshake.auth.userId).socketId.push(socket.id)
        }
        // console.log(socket)
        console.log(users)
        next()
    }
  });

io.on('connection', (socket)=> {
    console.log('a user connected');
    socket.join(socket.handshake.auth.userId)

    getUsers("online", socket, io)
    socket.emit("hello")
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

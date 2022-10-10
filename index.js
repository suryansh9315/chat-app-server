const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./User.js') 

const PORT = process.env.PORT || 5000

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
});

app.use(router)

io.on("connection", (socket) => {
    console.log(`New Socket Detected -> ${socket.id}`);
    socket.on("join",({ name,room }, callback)=>{
        const {error,newUser} = addUser({id:socket.id,name,room})
        if(error) return callback(error)
        socket.emit('message',{user:'admin',text:`${newUser.name} welcome to the room ${newUser.room}`})
        socket.broadcast.to(newUser.room).emit('message',{user:'admin',text:`${newUser.name}, has joined!`})
        socket.join(newUser.room)
        callback()
    })
    socket.on("sendMessage",(message, callback)=>{
        const {error,existingUser} = getUser(socket.id)
        if(error) return callback(error)
        io.to(existingUser.room).emit('message',{user:existingUser.name,text:message})
        callback()
    })
    socket.on("disconnectBitch", () => {
        console.log("User Disconnected");
    });
});

httpServer.listen(PORT,()=>{
    console.log(`Server is started on PORT -> ${PORT}`)
});

const io=require("socket.io")(8000,{
    cors:"*"
})

const users = {}

io.on("connection",(socket)=>{
    socket.on("new-user-joined",(name)=>{
        users[socket.id]=name
        socket.broadcast.emit("user-joined",name)
        console.log(users);
    })
    socket.on("send",(message)=>{
        socket.broadcast.emit("recieve",{message:message,name:users[socket.id]})
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit("left",users[socket.id])
        delete users[socket.id]
    })
})
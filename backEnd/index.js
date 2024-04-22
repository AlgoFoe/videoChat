const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

app.use(cors());
const PORT=7000;

app.get("/",(req,res)=>{
    res.send("Server bhaag rha h")
})

io.on('connection',(socket)=>{
    socket.emit('user-conn',socket.id);
    socket.on('disconnect',()=>{
        socket.broadcast.emit("call-ended")
    });  
    socket.on('call-user',({userToCall,signalData,from,name})=>{
        console.log("calling")
        io.to(userToCall).emit('call-user',{signal:signalData,from,name});
    });
    // data.to contains the id of client ,who is answering the call
    socket.on('answer-call',(data)=>{
        io.to(data.to).emit('call-accepted',data.signal);
    });
})

server.listen(PORT,()=>{
    console.log(`sun rha hu ,check karle http://localhost:${PORT}`);
})

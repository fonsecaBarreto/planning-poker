const { Server } = require("socket.io"); 
const {  MakeApp } = require("./app");
const PORT = process.env.PORT || 3000;
const httpServer = MakeApp();


const SocketResponse = (socket, payload) =>{
  return ({
    from: socket.id, 
    payload
  })

}
const io = new Server(httpServer);
var sockets = [];
io.on("connection", (socket) => {
  sockets.push({socketId: socket.id})
  console.log('Novo conexão');
  io.emit("UPDATE_USERS", SocketResponse(socket, sockets));

  socket.on("event", (data) => {
    const { action, payload  } = data;
    switch(action){
      case 'MESSAGE':
        console.log("Mensagem recebid")
        io.emit("MESSAGE", SocketResponse(socket, payload));
      break;
      default: break;
    }
  });

  socket.on("user_connected", ({ user}) => {
    sockets.splice( sockets.findIndex(s=>(s.socketId == socket.id)), 1, { socketId: socket.id, user })
    io.emit("UPDATE_USERS", SocketResponse(socket, sockets));
  });

  socket.on("disconnect", (reason) => {
    sockets= sockets.filter(s=>(s.socketId != socket.id))
    io.emit("UPDATE_USERS",  SocketResponse(socket, sockets));
  });
});



// instead of using `app.listen` we use `httpServer.listen`
httpServer.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
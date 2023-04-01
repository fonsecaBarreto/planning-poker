const { Server } = require("socket.io"); 
const {  MakeApp } = require("./app");
const PORT = process.env.PORT || 3000;
const httpServer = MakeApp();

const io = new Server(httpServer);
var sockets = [];
io.on("connection", (socket) => {
  sockets.push(socket.id)
  console.log('Novo conexão', sockets.length);
  io.emit("update_clients", { id: socket.id, payload: sockets });
 /*  
  socket.on("event", (data) => {
    socket.broadcast.emit("event", { id: socket.id, payload: data });
  }); */

  socket.on("disconnect", (reason) => {
    sockets= sockets.filter(s=>(s != socket.id))
    io.emit("update_clients", { id: socket.id, payload: sockets });
  });
});



// instead of using `app.listen` we use `httpServer.listen`
httpServer.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
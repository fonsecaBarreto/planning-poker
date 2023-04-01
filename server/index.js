const { Server } = require("socket.io"); 
const {  MakeApp } = require("./app");
const PORT = process.env.PORT || 3000;
const httpServer = MakeApp();

const io = new Server(httpServer);
io.on("connection", (socket) => {

  console.log("novo client connected -> ", socket.id, );

  // event to the client called `event` with a simple message
  socket.emit("event", "connected!");

  // and I start listening for the event `something`
  socket.on("something", (data) => {
    // log the data together with the socket.id who send it
    console.log(socket.id, data);
    // and emeit the event again with the message pong
    socket.emit("event", "pong");
  });
});

// instead of using `app.listen` we use `httpServer.listen`
httpServer.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

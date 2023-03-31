const { Server } = require("socket.io"); 
const {  MakeApp } = require("./app");
const PORT = process.env.PORT || 3000;
const httpServer = MakeApp();

const io = new Server(httpServer);
io.on("connection", (socket) => {
  // here you can do whatever you want with the socket of the client, in this
  // example I'm logging the socket.id of the client
  console.log(socket.id, "connected");
  // and I emit an event to the client called `event` with a simple message
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

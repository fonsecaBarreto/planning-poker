/* import { MakeApp } from '../server/app'
 */import io from "socket.io-client";
const sockets: string[] = [];
export type SocketEvent = {
  id: string;
  payload?: object;
};

export function init(){
  
  console.log("Iniicado aqui");
}

const socket = io("http://10.0.10.210:3000");
socket.on("server:new_connection", (event) => {
  const { id, payload } = event;
  console.log("Novo cliente conectaido-> ", id);
  sockets.push(id);
  console.log("total", JSON.stringify({ sockets }));
});
socket.on("server:new_event", (data) => {
  console.log("Tambem estou verificarioasnd saconeuabcac -> ", data);
  /*   setEvents((prev) => [...prev, data]); */
});

/*    socket.on("message", (data) => {
    // log the data together with the socket.id who send it
    console.log(socket.id, data);
    // and emeit the event again with the message pong
    io.emit("event", data);
  });*/

import io from "socket.io-client";

// const URL = 'http://localhost:3000';
const URL ='https://lol-planning-poker.herokuapp.com'
// 
export function connect() {
  return io(URL);
}

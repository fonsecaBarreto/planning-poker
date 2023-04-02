import io from "socket.io-client";

const URL ='https://lol-planning-poker.herokuapp.com'
// const URL = 'http://localhost:3000';

export function connect() {
  return io(URL);
}

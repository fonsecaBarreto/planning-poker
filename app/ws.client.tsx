import io from "socket.io-client";

export function connect() {
  return io("http://10.0.10.210:3000");
}

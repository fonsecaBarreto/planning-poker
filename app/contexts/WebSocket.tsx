import { createContext,  useEffect, useMemo, useState } from "react";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import type { Socket } from "socket.io-client";
import { connect } from "~/ws.client";

export let wsContext = createContext(
  {} as {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
    events: string[];
    messages: any;
    clients: any[];
    socketId: string;
  }
);
const { Provider } = wsContext

export function WsProvider({ children }: { children: React.ReactNode }): any {
  const [ socketId, setSocketId ]= useState("");
  const [ clients, setClients ] = useState([])
  const [events, setEvents] = useState<string[]>([]);
  const [messages, setMessages ] = useState<string[]>([]);
  let [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  useEffect(() => {
    let connection = connect();
    setSocket(connection);
    return () => {
      connection.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('connect', () => {
      setSocketId(socket?.id + "");
   });
    socket.on("UPDATE_USERS", (data) => {
      setClients(data.payload);
    });
    socket.on("MESSAGE", (data) => {
      console.log("mensagem recebida  de", data.from);
      setMessages((prev) => [...prev, data]);
    });
  }, [socket]);

  const value = useMemo(
    () => ({
      socket,
      events,
      clients,
      socketId,
      messages,
    }),
    [socket, events, clients, socketId, messages]
  );


  return <Provider value={value}> {children} </Provider>;
}

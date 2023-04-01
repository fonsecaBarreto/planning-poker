import { createContext,  useEffect, useMemo, useState } from "react";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import type { Socket } from "socket.io-client";
import { connect } from "~/ws.client";

export let wsContext = createContext<{
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  events: string[];
  clients: any[],
}>({ events: [], clients:[], socket: null });
const { Provider } = wsContext

export function WsProvider({ children }: { children: React.ReactNode }): any {
  const [ clients, setClients ] = useState([])
  const [events, setEvents] = useState<string[]>([]);
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
    socket.on("update_clients", (data) => {
      setClients(data.payload);
    });
    socket.on("event", (data) => {
      console.log("eventos recebido -> ", data);
      setEvents((prev) => [...prev, data]);
    });
  }, [socket]);

  const value = useMemo(
    () => ({
      socket,
      events,
      clients
    }),
    [socket, events, clients]
  );


  return <Provider value={value}> {children} </Provider>;
}

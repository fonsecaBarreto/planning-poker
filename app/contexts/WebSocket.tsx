import { createContext,  useEffect, useMemo, useState } from "react";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import type { Socket } from "socket.io-client";
import { connect } from "~/ws.client";

export let wsContext = createContext<{
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  events: string[];
}>({ events: [], socket: null });
const { Provider } = wsContext

export function WsProvider({ children }: { children: React.ReactNode }): any {
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
    socket.on("event", (data) => {
      console.log("eventos recebido -> ", data);
      setEvents((prev) => [...prev, data]);
    });
  }, [socket]);

  const value = useMemo(
    () => ({
      socket,
      events,
    }),
    [socket, events]
  );


  return <Provider value={value}> {children} </Provider>;
}

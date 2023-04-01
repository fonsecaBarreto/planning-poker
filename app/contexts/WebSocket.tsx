import { createContext,  useEffect, useMemo, useState } from "react";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import type { Socket } from "socket.io-client";
import { connect } from "~/ws.client";

export let wsContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
const { Provider } = wsContext

export function WsProvider({ children }: { children: React.ReactNode }): any {
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
    });
  }, [socket]);

  const value = useMemo(() => socket, [socket]);
  return <Provider value={value}> {children} </Provider>;
}

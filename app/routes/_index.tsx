import type { V2_MetaFunction } from "@remix-run/node";
import { useContext } from "react";
import { wsContext } from "~/contexts/WebSocket";
export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  const socket = useContext(wsContext);
  console.log("socket -> ",socket)

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <div>
        <button onClick={() => socket?.emit("something", "ping")}>
          Send ping
        </button>
      </div>
    </div>
  );
}

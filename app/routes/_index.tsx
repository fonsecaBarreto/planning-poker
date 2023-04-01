import type { V2_MetaFunction } from "@remix-run/node";
import { Form, useNavigation, useSearchParams } from "@remix-run/react";
import { useContext, useState } from "react";
import { wsContext } from "~/contexts/WebSocket";
export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  const {socket, events} = useContext(wsContext);
  const [ message, setMessage ] = useState("");
  const navigation = useNavigation();

  console.log("socket -> ",socket)

  const handleSubmit = (event: any) => {
    event.preventDefault();
    socket?.emit("message", message);
    setMessage("");
  };

  const isSubmitting = navigation.state === "submitting";
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Bem vindo</h1>
      <div>
        <Form disabled={isSubmitting} onSubmit={handleSubmit}>
          <input
            value={message}
            onInput={(e: any) => setMessage(e.target.value)}
            name="message"
            placeholder=" Sua Mensagem aqui"
          />
          <button type="submit">
            Enviar
          </button>
        </Form>

        <ul>
          {events.map((message) => (
            <li> {message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

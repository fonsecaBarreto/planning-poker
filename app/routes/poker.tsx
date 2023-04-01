import { json, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { requireUser } from "~/session.server";
import { useContext, useState } from "react";
import { wsContext } from "~/contexts/WebSocket";

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  return json({ user });
}

export default function Outra() {
  const { user } = useLoaderData<typeof loader>();
  const { socket, events, clients } = useContext(wsContext);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    /*     socket?.emit("event", { message });
    setMessage(""); */
  };
  const isSubmitting = navigation.state === "submitting";
  return (
    <div>
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Notes</Link>
        </h1>
        <p>{user.nickName}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <h1>Bem vindo</h1>
      <Link to="/"> home</Link>
      {JSON.stringify(clients)}
      <div>
        <Form disabled={isSubmitting} onSubmit={handleSubmit}>
          <input
            value={message}
            onInput={(e: any) => setMessage(e.target.value)}
            name="message"
            placeholder=" Sua Mensagem aqui"
          />
          <button type="submit">Enviar</button>
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

export const meta: V2_MetaFunction = () => {
  return [{ title: "Outra" }];
};

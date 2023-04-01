import {
  json,
  LinksFunction,
  LoaderArgs,
  V2_MetaFunction,
} from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { requireUser } from "~/session.server";
import { useContext, useEffect, useState } from "react";
import { wsContext } from "~/contexts/WebSocket";
import indexStylesUrl from "~/styles/poker.css";
import { MessageContainer } from "~/components/chat/messageContainer";

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  return json({ user });
}

export default function Poker() {
  const [ result, setResult ] = useState(0)
  const { socket, socketId, clients, messages } = useContext(wsContext);
  const { user } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    socket?.emit("user_connected", { user });
  }, [user, socket]);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    const message = e.target['message'].value
    socket?.emit("event", { action: "MESSAGE", payload: message });
  }

  return (
    <div className="poker-layout container">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <Link to="/"> Voltar </Link>
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

      <main>
        <h1>Lista de usuarios:</h1>
        <ul>
          {clients.map((client) => (
            <li>
              {client.socketId} - {client?.user?.nickName ?? "Anonimo"}
            </li>
          ))}
        </ul>

 {/*        <h1> Vote aqui</h1>
        <ul>
          <li>
            <button>1 </button>
          </li>
          <li>
            <button>2 </button>
          </li>
        </ul>

        <h1> Reusltado: </h1>

        <h3> {result} </h3> */}

        <h1> Chat </h1>
        <section>
          <span> Aqui deve ter um chat maneiro </span>
          <Form disabled={isSubmitting} onSubmit={handleSendMessage}>
            <input
              name="message"
              placeholder=" Sua Mensagem aqui"
            />
            <button type="submit">Enviar</button>
          </Form>

          {messages.map((msg: any) => (
            <li>
              <MessageContainer socketId={socketId} message={msg} />
            </li>
          ))}
        </section>
      </main>
    </div>
  );
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Poker Olanning" }];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: indexStylesUrl,
    },
  ];
};

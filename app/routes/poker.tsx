import {
  json,
  LinksFunction,
  LoaderArgs,
  V2_MetaFunction,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { requireUser } from "~/session.server";
import { useContext, useEffect, useState } from "react";
import { wsContext } from "~/contexts/WebSocket";
import indexStylesUrl from "~/styles/poker.css";

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  return json({ user });
}

export default function Poker() {
  const [ result, setResult ] = useState(0)
  const { socket, clients } = useContext(wsContext);
  const { user } = useLoaderData<typeof loader>();

  useEffect(() => {
    socket?.emit("user_connected", { user });
  }, [user, socket]);

  /*   const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting"; */

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

        <h1> Vote aqui</h1>
        <ul>
          <li>
            <button>1 </button>
          </li>
          <li>
            <button>2 </button>
          </li>
          <li>
            <button>3 </button>
          </li>
          <li>
            <button>4 </button>
          </li>
        </ul>


        <h1> Reusltado: </h1>

        <h3> { result } </h3>
      </main>

      <div>
        {/* <Form disabled={isSubmitting} onSubmit={handleSubmit}>
          <input
            value={message}
            onInput={(e: any) => setMessage(e.target.value)}
            name="message"
            placeholder=" Sua Mensagem aqui"
          />
          <button type="submit">Enviar</button>
        </Form>

        */}
      </div>
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

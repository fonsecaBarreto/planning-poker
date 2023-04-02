import {
  json,
  LinksFunction,
  LoaderArgs,
  V2_MetaFunction,
} from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { requireUser } from "~/session.server";
import { useContext, useEffect, useMemo, useState } from "react";
import { wsContext } from "~/contexts/WebSocket";
import indexStylesUrl from "~/styles/poker.css";
import { MessageContainer } from "~/components/chat/messageContainer";

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  return json({ user });
}


export async function action({ request }: LoaderArgs) {
  console.log("NEW TAKSJ")
  return json({  });
}

export default function Tasks() {
  const [result, setResult] = useState(0);
  const { socket, socketId, clients, messages } = useContext(wsContext);
  const { user } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    socket?.emit("user_connected", { user });
  }, [user, socket]);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    const message = e.target["message"].value;
    socket?.emit("event", { action: "MESSAGE", payload: message });
  };

  const orderedMesssage = useMemo(() => {
    const ordered = messages.reverse();
    return ordered;
  }, [messages]);

  return (
    <div className="poker-layout ">
      <header>
        <div className="container">
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
        </div>
      </header>

      <main className="container">
        <aside>
          <div className="users-list">
            <h3>Usuarios:</h3>
            <ul>
              {/* &#128308;  */}
              {clients.map((client) => (
                <li> &#128994; {client?.user?.nickName ?? "Anonimo"}</li>
              ))}
            </ul>
          </div>

          <h3> Chat </h3>
          <section className="chat-container">
            <MessageContainer
              socketId={socketId}
              message={{
                payload:
                  "asdasddwewqehqwdhsaksajaskdajk dhjaksdhkjasdjhasjkdsakjdaksjas",
              }}
            />
            {orderedMesssage.map((msg: any) => (
              <MessageContainer socketId={socketId} message={msg} />
            ))}
            <Form disabled={isSubmitting} onSubmit={handleSendMessage}>
              <label>
                <input name="message" placeholder=" Sua Mensagem aqui" />
                <button type="submit">Enviar</button>
              </label>
            </Form>
          </section>
        </aside>

        <div>
          <h3> Criar uma nova tarefa</h3>
          <Form method="post">
            <label>
              <input name="description" placeholder="Descrição" />
              <button type="submit">Enviar</button>
            </label>
          </Form>
        </div>
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

{
  /* <nav className="cards">
<button>1 </button>
<button>2 </button>
<button>2 </button>
<button>2 </button>
<button>2 </button>
<button>2 </button>
</nav>

<h3> Reusltado: </h3> */
}

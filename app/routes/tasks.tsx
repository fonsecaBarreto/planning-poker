import { json, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { requireUser } from "~/session.server";
import { useContext, useEffect } from "react";
import { wsContext } from "~/contexts/WebSocket";
import { MessageContainer } from "~/components/chat/messageContainer";
// css
import indexStylesUrl from "~/styles/poker.css";
import tasksStylesUrl from "~/styles/tasks.css";

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  return json({ user });
}

export default function Tasks() {
  const { user } = useLoaderData<typeof loader>();
  const { socket, socketId, clients, messages } = useContext(wsContext);
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
            {messages.map((msg: any) => (
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
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Poker Olanning" }];
};

export function links() {
  return [
    {
      rel: "stylesheet",
      href: indexStylesUrl,
    },
    {
      rel: "stylesheet",
      href: tasksStylesUrl,
    },
  ];
}

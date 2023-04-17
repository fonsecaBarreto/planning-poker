import { json, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
} from "@remix-run/react";
import { requireUser } from "~/session.server";
import { useContext, useEffect, useState } from "react";
import { wsContext } from "~/contexts/WebSocket";
// css
import tasksStylesUrl from "~/styles/tasks.css";
/* SIDEBAR */
import { SideBar } from "~/components/sidebar";
import sideBarStylesUrl from "~/components/sidebar/styles.css";

export async function loader({ request }: LoaderArgs) {
  const user = await requireUser(request);
  return json({ user });
}

export default function Tasks() {
  const { user } = useLoaderData<typeof loader>();
  const { socket } = useContext(wsContext);

  const [isAsideOpen, setIsAsideOpen] = useState(true);

  useEffect(() => {
    socket?.emit("user_connected", { user });
  }, [user, socket]);

  return (
    <div className="poker-layout ">
      <header>
        <div className="container">
          <Link className="back-button" to="/tasks">
            &#8249;
          </Link>
          <Form className="logout-button" action="/logout" method="post">
            <label>
              <p>{user.nickName}</p>
              <button
                type="submit"
                className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
              >
                &#10162;
              </button>
            </label>
          </Form>
        </div>
      </header>

      <aside className={`${isAsideOpen ? "aside-open" : ""}`}>
        <SideBar />
        <button
          onClick={()=>setIsAsideOpen(prev=>!prev)} 
          className="aside-float-button"/>
      </aside>

      <main className="container">
        <aside>
        </aside>
        <div>
          <Outlet context={{ user }} />
        </div>
      </main>

      <footer></footer>
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
      href: sideBarStylesUrl,
    },
    {
      rel: "stylesheet",
      href: tasksStylesUrl,
    },
  ];
}

import { ActionArgs, json, LoaderArgs, redirect, V2_MetaFunction } from "@remix-run/node";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";

import { createTask, getTasks } from "~/models/task.server";
// css
import TaksItem, { links as taskItemLinks } from "~/components/task";

export async function loader({ request }: LoaderArgs) {
  const tasks = await getTasks();
  return json({ tasks });
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const description = form.get("description") + "";
  await createTask({ description });
  return redirect(`/tasks`);
}

export default function Tasks() {
  const { tasks } = useLoaderData<typeof loader>();
  const parent = useOutletContext();

  return (
    <div>
      <h1 className="text-3xl font-bold"> Criar uma nova tarefa</h1>
      <Form className="new-task-form" method="post">
        <fieldset>
          <legend>Descrição</legend>
          <textarea
            name="description"
            placeholder=""
            rows={2}
            className="w-full flex-1 rounded-md border-2 border-grey-500 px-3 py-2 text-lg leading-6"
          />
          <button
            className="rounded bg-rose-700 px-4 py-2 text-white hover:bg-rose-600 focus:bg-rose-400"
            type="submit"
          >
            &#x2b;
          </button>
        </fieldset>
      </Form>
      <nav className="task-list">
        {tasks.length === 0 ? (
          <p className="p-4">Nenhum tarefa ainda</p>
        ) : (
          <ol>
            {tasks.map((t) => (
              <li key={t.id}>
                <TaksItem id={t.id} description={t.description} />
              </li>
            ))}
          </ol>
        )}
      </nav>
      <Outlet />
    </div>
  );
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Poker Olanning" }];
};

export function links() {
  return [
    ...taskItemLinks(),
  ];
}

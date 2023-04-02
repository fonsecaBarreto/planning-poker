import { ActionArgs, json, LoaderArgs, redirect, V2_MetaFunction } from "@remix-run/node";
import {
  Form,
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

  console.log("parents", parent);

  return (
    <div>
      <h3> Criar uma nova tarefa</h3>
      <Form method="post">
        <label>
          <textarea name="description" placeholder="Descrição" />
          <button type="submit">Enviar</button>
        </label>
      </Form>
      <nav className="task-list">
        {tasks.map((t: any) => (
          <TaksItem id={t.id} description={t.description} />
        ))}
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

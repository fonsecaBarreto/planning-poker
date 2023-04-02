import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData, useOutletContext } from "@remix-run/react";
import { useMemo } from "react";
import { Cards } from "~/components/cards";
import { getTaskById, punctuate } from "~/models/task.server";
import { requireUser } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const task = await getTaskById(params.taskId + "");
  if (!task) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ task });
}

export async function action({ request, params }: ActionArgs) {
  const taskId = params.taskId + "";
  const user = await requireUser(request);

  const form = await request.formData();
  const punctuation = Number(form.get("punctuation") + "") ?? 0;
  console.log(punctuation);
  try {
    await punctuate({ punctuation, userId: user.id, taskId });
  } catch (err) {
    console.log("Nao foi possivel pontuar", err);
  }
  return redirect(`/tasks/${params.taskId}`);
}

export default function Task() {
  const { task } = useLoaderData<typeof loader>();
  const { user } = useOutletContext<any>();

 const iveVoted = useMemo(() => {
  if (!user || !task) return false;
   const mine = task.punctuations.findIndex((p: any) => (p.userId == user.id));
   return mine !== -1;
 }, [task, user]);
 
  return (
    <div>
      <h1 className="text-3xl font-bold">  O que estamos votando?</h1>
      <h4 className="text-1xl">{task.description}</h4>
      <br/>

      <Cards total={5}/>

      {/* <Form method="post">
        <label>
          1<input type="radio" name="punctuation" value="1"></input>
        </label>
        <label>
          2<input type="radio" name="punctuation" value="2"></input>
        </label>
        <label>
          3<input type="radio" name="punctuation" value="3"></input>
        </label>
        <label>
          4<input type="radio" name="punctuation" value="4"></input>
        </label>
        <button type="submit" disabled={iveVoted}>
          {" "}
          {iveVoted ? "Ja pontuou" : "pontuar"}
        </button>
      </Form> */}

      <h3> pontos: </h3>
      {JSON.stringify({ ponots: task.punctuations.map((p) => p.value) })}
      <h3> Reusltado: </h3>
    </div>
  );
}

import { TaskPunctuations } from "@prisma/client";
import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { useMemo } from "react";
import PunctuationForm from "~/components/task/PuctuationFom";
import { open, close, getTaskById, punctuate } from "~/models/task.server";
import { requireUser } from "~/session.server";

export async function action({ request, params }: ActionArgs) {
  console.log("POST > taks/id -------------------------");
  const taskId = params.taskId + "";
  const user = await requireUser(request);
  const form = await request.formData();

  switch (form.get("action")) {
    case "punctuate":
      {
        const punctuation = form.get("punctuation") + "";
        try {
          const punctuation_number = Number(punctuation);
          if (isNaN(punctuation_number)) {
            return json(
              { errors: { title: "Pontuação invalida", body: null } },
              { status: 400 }
            );
          }
          await punctuate({
            punctuation: Number(punctuation),
            userId: user.id,
            taskId,
          });
        } catch (err) {
          return json(
            { errors: { title: "Voce já votou", body: null } },
            { status: 403 }
          );
        }
      }
    break;
    case "close":
        await close({ taskId });
    break;
    case "clear_punctuation":
        await open({ taskId });
    break;
    default: {
      throw new Error("Unknown action");
    }
  }
  return redirect(`/tasks/${params.taskId}`);
}

export default function Task() {
  const { task } = useLoaderData<typeof loader>();
  const { user } = useOutletContext<any>();

  const myLastVote = useMemo(() => {
    if (!user || !task) return null;
    const mine = task.punctuations.find((p: any) => p.userId == user.id)?.value;
    return mine ?? null;
  }, [task, user]);

  const resultado = useMemo(()=>{
    if(!task.isClosed) return null;

    const total = task?.punctuations.map(p=>(p.value ?? 0)).reduce((a, b) => a + b, 0)
    const media  = total /  task.punctuations.length
    return ({ total, media })
  },[ task])

  return (
    <div>
      <h1 className="text-3xl font-bold"> O que estamos votando?</h1>
      <h4 className="text-1xl">{task.description}</h4>
      <br />

      {task.isClosed ? (
        <>
          <h3> Resultado: </h3>
          <h4> {resultado?.total}</h4>
          <h3> Media: </h3>
          <h4> {resultado?.media}</h4>

          <Form method="post">
            <input type="hidden" name="action" value="clear_punctuation" />
            <button
              type="submit"
              className="rounded bg-rose-700 px-4 py-2 text-rose-100 hover:bg-blue-500 active:bg-rose-600"
            >
              Refazer
            </button>
          </Form>
        </>
      ) : (
        <>
          <PunctuationForm defaultValue={myLastVote} />
          <h3> votos: </h3>
          <ul>
            {task.punctuations.map((p: any, i: number) => (
              <li key={i}>{p.user.nickName}: {p.value}</li>
            ))}
          </ul>
          <hr />
          <Form method="post">
            <input type="hidden" name="action" value="close" />
            <button
              type="submit"
              className="rounded bg-rose-700 px-4 py-2 text-rose-100 hover:bg-blue-500 active:bg-rose-600"
            >
              Revelar
            </button>
          </Form>
        </>
      )}
    </div>
  );
}



export async function loader({ request, params }: LoaderArgs) {
  const task = await getTaskById(params.taskId + "");
  if (!task) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ task });
}

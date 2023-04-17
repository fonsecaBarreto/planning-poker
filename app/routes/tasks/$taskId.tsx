import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { useContext, useEffect, useMemo } from "react";
import PunctuationForm, { links as punctuationLinks }from "~/components/task/PuctuationFom";
import { Cards } from "~/components/task/Table/cards";
import { wsContext } from "~/contexts/WebSocket";
import { open, close, getTaskById, punctuate } from "~/models/task.server";
import { requireUser } from "~/session.server";

export async function action({ request, params }: ActionArgs) {
  console.log("POST > taks/id -------------------------");
  const taskId = params.taskId + "";
  const user = await requireUser(request);
  const form = await request.formData();
  
  const _action = form.get('action');
  switch (_action) {
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

          return json(
            { action: _action },
            { status: 200 }
          );
        } catch (err) {
          return json(
            { errors: { title: "Algo errado", body: null } },
            { status: 500 }
          );
        }
      }
    case "close":
        await close({ taskId });
        return json(
          { action: _action },
          { status: 200 }
        );
    case "clear_punctuation":
        await open({ taskId });
        return json(
          { action: _action },
          { status: 200 }
        );
    default: {
      throw new Error("Unknown action");
    }
  }
}

export default function Task() {
  const { task } = useLoaderData<typeof loader>();
  const result = useActionData();
  const { user } = useOutletContext<any>();
  const { socket } = useContext(wsContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (!result) return;
    if (result?.action) {
      socket?.emit("update_task");
    }
  }, [result]);

  useEffect(() => {
    if (!socket) return;
    socket.on('UPDATE_TASK', () =>{
      navigate('.', { replace: true })
    })
  }, [socket]);

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

      <Cards
        onChange={(v) => {}}
        values={task.punctuations.map((v: any) => v.value)}
        block={myLastVote !== null}
      />

      {task.isClosed && (
        <>
          <h3> Resultado: </h3>
          <h4> {resultado?.total}</h4>
          <h3> Media: </h3>
          <h4> {resultado?.media}</h4>
        </>
      )}

      <Form method="post">
        <input type="hidden" name="action" value={ task.isClosed  ? "clear_punctuation": "close"} />
        <button
          type="submit"
          className="rounded bg-rose-700 px-4 py-2 text-rose-100 hover:bg-blue-500 active:bg-rose-600"
        >

          {task.isClosed  ? "Refazer": "Fechar"}
        </button>
      </Form>

      <PunctuationForm defaultValue={myLastVote} />
      <hr />
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

export function links() {
  return [
    ...punctuationLinks(),
  ];
}

import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getTaskById, punctuate } from "~/models/task.server";

export async function loader({ request, params }: LoaderArgs) {
  const task = await getTaskById(params.taskId + "");
  if (!task) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ task });
}

export async function action({ request, params }: ActionArgs) {
  const form = await request.formData();
  const punctuation = form.get("punctuation") + "";
  console.log(punctuation);
  /* try{
        await punctuate({ punctuation });
    }catch(err){
        console.log('Nao foi possivel pontuar')
    } */
  return redirect(`/tasks/${params.taskId}`);
}

export default function Task() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      {JSON.stringify(data)}

      <Form method="post">
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
        <button type="submit"> enviar </button>
      </Form>

      <h3> Reusltado: </h3>
    </div>
  );
}

import { ActionArgs, json, LinksFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { createUser } from "~/models/user.server";
import { createUserSession } from "~/session.server";
import indexStylesUrl from "~/styles/index.css";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const nickName = formData.get("nickName");

  if (typeof nickName !== "string" || nickName.length <= 2) {
    return json(
      { errors: { title: "nickName is required", body: null } },
      { status: 400 }
    );
  }

  const user = await createUser({ nickName });
  return createUserSession({
    request,
    userId: user.id,
    redirectTo: "/tasks",
  });
}

export default function IndexLogin() {
  return (
    <div className="index-layout">
      <>
        <Form className="login-form" method="post">
          <label>
            <span> Nome: </span>
            <input type="text" name="nickName" placeholder="Seu nome aqui" />
          </label>
          <button
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            type="submit"
          >
            Enviar
          </button>
          <Link className="back-btn" to="/">Votlar</Link>
        </Form>
      </>
    </div>
  );
}

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: indexStylesUrl,
    },
  ];
};

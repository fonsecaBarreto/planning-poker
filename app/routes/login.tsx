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
    redirectTo: "/poker",
  });
}

export default function IndexLogin() {
  return (
    <div className="index-layout">
      <>
        <Form className="login-form" method="post">
          <label>
            Apelido:
            <input name="nickName" placeholder="Seu nome aqui" />
          </label>
          <button type="submit">Enviar</button>
        </Form>
        <Link to="/">Votlar</Link>
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

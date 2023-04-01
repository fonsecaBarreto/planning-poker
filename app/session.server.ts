import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { getUserById } from "./models/user.server";

/* cookier */
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["segredo_sessao"],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

/* athenticator */

export async function requireUser(request: Request) {
  const session = await getSession(request);
  const userId = session.get("userId");
  if (!userId) {
    throw redirect(`/login`);
  }
  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function createUserSession({
  request,
  userId,
  redirectTo,
}: {
  request: Request;
  userId: string;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 1 // 1 day
      }),
    },
  });
}
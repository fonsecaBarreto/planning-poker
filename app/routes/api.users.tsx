import { ActionArgs, json } from "@remix-run/node";
import { findManyUsers } from "~/models/user.server";

export async function loader({ request }: ActionArgs) {
  console.log("getting users")
  const users = await findManyUsers();
  return json({users });
}



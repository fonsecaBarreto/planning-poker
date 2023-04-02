import { Link, NavLink } from "@remix-run/react";
import styles from "~/components/task/task.css";

export function TaksItem ({ id, description }: any)  {
    return (
      <NavLink
        className={`task-item block border-b p-4 text-xl`}
        to={id}>
        📝 {description}
      </NavLink>
    );
  };
  
export default TaksItem

export function links() {
  return [{ rel: "stylesheet", href: styles }];
};
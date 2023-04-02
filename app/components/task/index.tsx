import { Link } from "@remix-run/react";
import styles from "~/components/task/task.css";

export function TaksItem ({ id, description }: any)  {
    return (
      <div className="task-item">
        <Link to={id}>{description}</Link>
      </div>
    );
  };
  
export default TaksItem

export function links() {
  return [{ rel: "stylesheet", href: styles }];
};
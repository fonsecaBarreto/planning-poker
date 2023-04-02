import styles from "~/components/task/task.css";

export function TaksItem ({ children }: any)  {
    return (
      <div className="task-item">
        <span>{children}</span>
      </div>
    );
  };
  
export default TaksItem

export function links() {
  return [{ rel: "stylesheet", href: styles }];
};
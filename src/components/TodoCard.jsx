import { Link } from "@tanstack/react-router";

export default function TodoCard({ todo }) {
  return (
    <article className="todo-card">
      <h3 className="todo-title">{todo.name}</h3>
      <p className={`todo-status ${todo.status.toLowerCase()}`}>
        {todo.status}
      </p>

    <Link to="/tasks/$id" params={{ id: todo.id }} className="read-more">
        View Details
      </Link>
    </article>
  );
}

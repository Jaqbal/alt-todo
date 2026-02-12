import { useParams, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function TodoDetail() {
  const { id } = useParams({ from: "/tasks/$id" });
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTodo() {
      setLoading(true);
      try {
        const res = await fetch(`https://api.oluwasetemi.dev/tasks/${id}`);
        if (res.status === 404) throw new Error("Task not found");
        if (!res.ok) throw new Error("Failed to fetch task");
        const data = await res.json();
        setTodo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTodo();
  }, [id]);

  if (loading) return <p className="loading">Loading task...</p>;
  if (error) return <p className="loading error">{error}</p>;
  if (!todo) return null;

  return (
    <div className="todo-detail">
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>
      <h1 className="todo-detail-title">{todo.name}</h1>
      <p className="todo-detail-status">{todo.status}</p>
      <p className="todo-detail-meta">Priority: {todo.priority}</p>
      {todo.description && <p>{todo.description}</p>}
      <p>Start: {todo.start || "N/A"}</p>
      <p>End: {todo.end || "N/A"}</p>
      <p>Duration: {todo.duration || "N/A"}</p>
    </div>
  );
}

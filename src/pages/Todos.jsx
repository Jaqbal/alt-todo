import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

const Todos = () => {
  // --- 1. State Management ---
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 1 });

  // Filter & Search State
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const apiUrl = `https://api.oluwasetemi.dev/tasks?page=${page}&limit=10${
    status ? `&status=${status}` : ""
  }${debouncedSearch ? `&search=${debouncedSearch}` : ""}`;

  useEffect(() => {
    async function fetchTodos() {
      setLoading(true);
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to load tasks");
        const data = await res.json();
        
        setTodos(data.data || []);
        setMeta(data.meta || { totalPages: 1 });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTodos();
  }, [apiUrl]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1); 
  };

  // ---  Render Logic ---
  return (
    <div className="page">
      <h1 className="page-title">Task Dashboard</h1>
      <section className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-tabs">
          {["", "TODO", "IN_PROGRESS", "DONE", "CANCELLED"].map((s) => (
            <button
              key={s}
              className={status === s ? "filter-btn active" : "filter-btn"}
              onClick={() => handleFilterChange(s)}
            >
              {s === "" ? "All" : s.replace("_", " ")}
            </button>
          ))}
        </div>
      </section>

      {/* TODO GRID / LIST */}
      {loading ? (
        <div className="loading">Updating list...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <>
          <div className="todo-grid">
            {todos.length === 0 ? (
              <p className="no-data">No tasks found matching your criteria.</p>
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className="todo-card">
                  <div className="todo-card-content">
                    <h3 className="todo-title">{todo.name}</h3>
                    <span className={`status-pill ${todo.status.toLowerCase()}`}>
                      {todo.status}
                    </span>
                  </div>
                  <Link 
                    to="/tasks/$id" 
                    params={{ id: todo.id }} 
                    className="read-more"
                  >
                    View Details →
                  </Link>
                </div>
              ))
            )}
          </div>
          {meta.totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="pag-btn"
              >
                Previous
              </button>
              
              <span className="pagination-info">
                Page {page} of {meta.totalPages}
              </span>

              <button 
                onClick={() => setPage(p => Math.min(p + 1, meta.totalPages))}
                disabled={page === meta.totalPages}
                className="pag-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Todos;
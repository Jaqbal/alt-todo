import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FilterTabs from "../components/FilterTabs";
import TodoCard from "../components/TodoCard";
import Pagination from "../components/Pagination";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "completed", "incomplete"

  // 1. Map UI Filter to API Status
  const getApiStatus = (uiFilter) => {
    if (uiFilter === "completed") return "DONE";
    if (uiFilter === "incomplete") return "TODO";
    return ""; // "all"
  };

  const status = getApiStatus(filter);
  const apiUrl = `https://api.oluwasetemi.dev/tasks?page=${page}&limit=10${
    status ? `&status=${status}` : ""
  }${search ? `&search=${search}` : ""}`;

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const res = await fetch(apiUrl);
        const json = await res.json();
        setTasks(json.data);
        setTotalPages(json.meta.totalPages);
      } catch (err) {
        console.error("Failed to load tasks", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [apiUrl]);

  return (
    <main className="page">
     <header className="blog-header">
  <h1 className="blog-title">Tasks</h1>
  <div className="controls">
    <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
    <FilterTabs filter={filter} onChange={(val) => { setFilter(val); setPage(1); }} />
  </div>
</header>

      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <>
          <div className="post-grid">
            {tasks.map(task => (
              <TodoCard key={task.id} todo={task} />
            ))}
          </div>
          <Pagination 
            page={page} 
            totalPages={totalPages} 
            setPage={setPage} 
          />
        </>
      )}
    </main>
  );
}
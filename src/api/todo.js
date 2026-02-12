const BASE_URL = "https://api.oluwasetemi.dev"

export async function fetchTodos(page = 1, limit = 10) {
  const res = await fetch(`${BASE_URL}/tasks?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error("Failed to fetch tasks")
  return res.json()
}

export async function fetchTodoById(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`)
  if (!res.ok) throw new Error("Task not found")
  return res.json()
}

import { createBrowserRouter, RouterProvider } from '@tanstack/router'
import Todos from './pages/Todos'
import TodoDetail from './pages/TodoDetail'
import NotFound from './pages/NotFound'

// Define route IDs
const rootRoute = {
  path: '/',
  element: <Todos />,
}

const todoDetailRoute = {
  path: '/todo/:id',
  element: <TodoDetail />,
}

const notFoundRoute = {
  path: '*',
  element: <NotFound />,
}

// Combine routes
export const router = createBrowserRouter([rootRoute, todoDetailRoute, notFoundRoute])

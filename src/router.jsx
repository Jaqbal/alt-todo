import { createRouter, createRoute, createRootRoute, Outlet } from "@tanstack/react-router"
import Home from "./pages/Home.jsx"
import TodoDetail from "./pages/TodoDetail.jsx"
import ErrorTest from "./pages/ErrorTest.jsx"
import NotFound from "./pages/NotFound.jsx"

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

// Routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
})

const todoDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tasks/$id", 
  component: TodoDetail,
})

const errorTestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/error-test",
  component: ErrorTest,
})

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  todoDetailRoute,
  errorTestRoute,
  notFoundRoute,
])

export const router = createRouter({ routeTree })
export { homeRoute, todoDetailRoute, errorTestRoute, notFoundRoute }

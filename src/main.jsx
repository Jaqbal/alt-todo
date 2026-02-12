import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"
import { router } from "./router"
import { ErrorBoundary } from "./components/ErrorBoundary"
import Home from "./pages/Home.jsx"
import TodoDetail from "./pages/TodoDetail.jsx"
import ErrorTest from "./pages/ErrorTest.jsx"
import NotFound from "./pages/NotFound.jsx"

import App from "./App.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
)

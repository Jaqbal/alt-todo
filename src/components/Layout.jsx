import { Outlet, Link } from "@tanstack/react-router"

export default function Layout() {
  return (
    <>
      <header className="app-header">
        <div className="header-inner">
          <h1 className="logo">TodoApp</h1>
          <nav>
            <Link to="/" className="nav-link">Todos</Link>
          </nav>
        </div>
      </header>

      <Outlet />
      
    </>
  )
}

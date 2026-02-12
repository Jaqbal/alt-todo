export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-card">
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/" className="back-button">
          Go Home
        </Link>
      </div>
    </div>
  )
}

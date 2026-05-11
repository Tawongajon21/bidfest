export default function NotFound() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-950">404</h1>
          <p className="text-gray-500 mt-2">Page not found</p>
          <a href="/" className="text-blue-500 mt-4 block">
            Go back home
          </a>
        </div>
      </div>
    )
  }
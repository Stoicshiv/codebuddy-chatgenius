
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App.tsx'
import './index.css'

// Global fallback UI
function FallbackComponent({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-900/20 via-indigo-900/20 to-purple-900/20">
      <div className="max-w-md p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="text-gray-700 mb-4">The application couldn't load properly. Please try refreshing the page.</p>
        <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-32">
          {error.message}
        </pre>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  )
}

// Mount with error boundary
createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={FallbackComponent}>
    <App />
  </ErrorBoundary>
);

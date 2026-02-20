import type { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
          Something went wrong
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          We encountered an unexpected error. Please try again.
        </p>
        {import.meta.env.DEV && (
          <pre className="text-left bg-gray-200 dark:bg-gray-900 p-4 rounded mb-6 overflow-auto text-xs text-red-500">
            {(error as Error)?.message || "Unknown error"}
          </pre>
        )}
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;

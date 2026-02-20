import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/Error/ErrorFallback";
import { router } from "./router/router";

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import GsapWrapper from "./utils/GsapWrapper.tsx";
import App from "./App.tsx";
import { TooltipProvider } from "./components/ui/tooltip";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <GsapWrapper>
          <SidebarProvider defaultOpen={false}>
            <TooltipProvider>
              <App />
              <Toaster />
            </TooltipProvider>
          </SidebarProvider>
        </GsapWrapper>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
);

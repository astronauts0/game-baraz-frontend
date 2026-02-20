import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import GsapWrapper from "./utils/GsapWrapper.tsx";
import App from "./App.tsx";
import { TooltipProvider } from "./components/ui/tooltip";
import { SidebarProvider } from "./components/ui/sidebar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GsapWrapper>
      <SidebarProvider defaultOpen={false}>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </SidebarProvider>
    </GsapWrapper>
  </StrictMode>,
);

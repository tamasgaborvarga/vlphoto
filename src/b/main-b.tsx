import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index-b.css";
import AppB from "./AppB";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppB />
  </StrictMode>,
);

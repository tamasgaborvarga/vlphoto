import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index-c.css";
import AppC from "./AppC";

document.documentElement.classList.add("js");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppC />
  </StrictMode>,
);

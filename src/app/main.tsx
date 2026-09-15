import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../config/tokens.css";
import "../config/typography.css";
import "../styles/global.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./provider";

const root = document.getElementById("root");

if (!root) throw new Error("No root element found");

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

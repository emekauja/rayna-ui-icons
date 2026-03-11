import React from "react";
import ReactDOM from "react-dom/client";

import { themeVariablesCss } from "@raynaui/icons-theme";

import { App } from "./App";
import "./styles.css";

const themeStyle = document.createElement("style");
themeStyle.innerHTML = themeVariablesCss;
document.head.appendChild(themeStyle);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

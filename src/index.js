import React from "react";
import ReactDOM from "react-dom";
import "./css/index.scss";
import App from "./App";
import { getCookie, setCookie } from "./helpers/index";
if (getCookie("intro")) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
} else {
  setTimeout(() => {
    setCookie("intro", 24);
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }, 5000);
}

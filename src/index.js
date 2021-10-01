import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";

import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./store/providers/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

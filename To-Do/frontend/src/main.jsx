import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store";
import Authentication from "../src/Pages/AuthenticationPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Authentication />
  </Provider>
);

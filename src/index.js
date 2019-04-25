"use strict";

import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./scss/main.scss";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("catalog-app")
);

registerServiceWorker();

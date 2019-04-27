import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./app/store/configureStore";
import App from "./app/App";
const store = configureStore();

import "./scss/main.scss";
import "./vendor/dropzone.min.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("catalog-app")
);

registerServiceWorker();

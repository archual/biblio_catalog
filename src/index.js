import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import history from "./app/utils/history";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./app/store/configureStore";
import App from "./app/App";
const store = configureStore();

import "./scss/main.scss";
import "./vendor/dropzone.min.css";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("catalog-app")
);

registerServiceWorker();

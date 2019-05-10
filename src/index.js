import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import history from "./app/utils/history";
import registerServiceWorker from "./registerServiceWorker";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./scss/main.scss";
import "./vendor/dropzone.min.css";
import configureStore from "./app/store/configureStore";
import App from "./app/App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("catalog-app")
);

registerServiceWorker();

import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./layout/header";
import Main from "./layout/main";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Header />
        <Main />
      </React.Fragment>
    );
  }
}

export default App;

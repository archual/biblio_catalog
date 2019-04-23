import React, { Component } from "react";
import Header from "./layout/Header";
import Main from "./layout/Main";

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

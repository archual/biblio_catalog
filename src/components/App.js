import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

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

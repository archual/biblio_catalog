import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import Books from "./components/books";
import Home from "./components/home";
import BookForm from "./components/bookForm.jsx";
import NotFound from "./components/notFound";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Header />
        <main className="container">
          <Switch>
            <Route path="/books/:id" component={BookForm} />
            <Route path="/books" component={Books} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

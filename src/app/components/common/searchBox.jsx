import React, { Component } from "react";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = event => {
    const { value } = event.currentTarget;

    this.setState({ value: value });
    this.props.onChange(value);
  };

  render() {
    const { value } = this.state;

    return (
      <input
        type="text"
        name="query"
        className="form-control my-3"
        placeholder="Search..."
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

export default SearchBox;

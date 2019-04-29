import React, { Component } from "react";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = event => {
    const { value } = event.currentTarget;

    this.setState({ value });
    this.props.onChange(value);
  };

  componentDidMount() {
    this._setValueFromProps();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value === this.props.value) {
      return;
    }

    this._setValueFromProps();
  }

  _setValueFromProps() {
    const { value } = this.props;

    this.setState({ value });
  }

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

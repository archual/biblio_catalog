import React, { Component } from "react";
import Select from "./select";

class SelectOrAdd extends Component {
  state = {};

  componentDidMount() {
    const {
      name,
      label,
      getOptions,
      fieldData,
      handleChange,
      error,
      ...rest
    } = this.props;
    getOptions();
  }

  render() {
    return (
      <React.Fragment>
        <Select
          name={name}
          value={""}
          label={label}
          options={[]}
          onChange={this.handleChange}
          error={errors[name]}
        />
      </React.Fragment>
    );
  }
}

export default SelectOrAdd;

import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import MultiSelect from "./multiSelect";
import Dropzone from "./dropZone";

class Form extends Component {
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.props.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    // TODO
    // this.setState({ errors: errors || {} });
    this.doUpdateErrors(errors || {});
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.props.errors };
    const multiple = input.multiple;
    let errorMessage = "";

    const updatedInput = {
      name: input.name,
      value: multiple ? this._getMultiselectValues(input) : input.value
    };

    errorMessage = this.validateProperty(updatedInput);

    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.props.data };
    data[input.name] = updatedInput.value;

    this.doUpdateData(data);
    this.doUpdateErrors(errors || {});
  };

  _getMultiselectValues = select => {
    const options = select.options;

    const selectedOptions = Array.from(options).filter(option => {
      return option.selected;
    });

    const selectedValues = selectedOptions.map(option => option.value);

    return selectedValues;
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options, multiple, size) {
    const { data, errors } = this.props;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        nultiple={multiple}
        size={size}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderMultiSelect(name, label, options, size) {
    const { data, errors } = this.props;

    return (
      <MultiSelect
        name={name}
        value={data[name]}
        label={label}
        options={options}
        size={size}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, value, type = "text") {
    const { data, errors } = this.props;

    return (
      <Input
        type={type}
        name={name}
        value={value || data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  rednderDropzone(
    name,
    label,
    apiUrl,
    handleAddFile,
    handleUploaded,
    handleUploadError,
    handleThumbnailCreated
  ) {
    return (
      <React.Fragment>
        <label>{label}</label>
        <Dropzone
          fieldName={name}
          apiUrl={apiUrl}
          handleAddFile={handleAddFile}
          handleUploaded={handleUploaded}
          handleError={handleUploadError}
          handleThumbnailCreated={handleThumbnailCreated}
        />
      </React.Fragment>
    );
  }
}

export default Form;

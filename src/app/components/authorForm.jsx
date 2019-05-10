import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { connect } from "react-redux";
import {
  getAuthor,
  updateFormData,
  setFormData,
  updateFormErrors,
  saveAuthor
} from "../actions/authorsActions";

class AuthorForm extends Form {
  schema = {
    _id: Joi.string().empty(""),
    name: Joi.string()
      .min(3)
      .max(20)
      .required()
      .label("First name"),
    surname: Joi.string()
      .min(3)
      .max(20)
      .required()
      .label("Last name")
  };

  componentDidMount() {
    const authorId = this.props.match.params.id;

    if (authorId === "new") {
      this.props.setFormData({});
      return;
    }

    this.props.getAuthor(authorId);
  }

  doUpdateData = data => {
    this.props.updateFormData(data);
  };

  doUpdateErrors = errors => {
    this.props.updateFormErrors(errors);
  };

  doSubmit = () => {
    this.props.saveAuthor(this.props.data);

    const params = new URLSearchParams(this.props.location.search);
    const redirectUrl = params.get("redirectUrl");

    if (redirectUrl) {
      this.props.history.push(`${redirectUrl}?authorAdded=true`);
    } else {
      this.props.history.push("/authors");
    }
  };

  render() {
    const { data: author } = this.props;
    return (
      <div>
        <h1>Edit author: {author.title}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "First name")}
          {this.renderInput("surname", "Last name")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = store => {
  const { data, errors } = store.authorsState;

  return {
    data,
    errors
  };
};

const mapDispatchToProps = {
  getAuthor,
  setFormData,
  updateFormData,
  updateFormErrors,
  saveAuthor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorForm);

import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { connect } from "react-redux";
import { getGenres } from "../actions/genresActions";
import { getAuthors } from "../actions/authorsActions";

import {
  getBook,
  updateFormData,
  updateFormErrors,
  saveBook
} from "../actions/booksActions";

class BookForm extends Form {
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    image: Joi.any().label("Image"),
    authors: Joi.array()
      .min(1)
      .required()
      .label("Authors")
  };

  componentDidMount() {
    this.props.getGenres();
    this.props.getAuthors();

    const bookId = this.props.match.params.id;
    if (bookId === "new") return;

    this.props.getBook(bookId);
  }

  doUpdateData = data => {
    this.props.updateFormData(data);
  };

  doUpdateErrors = errors => {
    this.props.updateFormErrors(errors);
  };

  doSubmit = () => {
    this.props.saveBook(this.props.data);

    this.props.history.push("/books");
  };

  handleAddFile = file => {
    console.log("file added", file);
  };

  handleUploaded = file => {
    console.log("file handleUploaded", file);
  };

  handleUploadError = file => {
    console.log("file handleUploadError", file);
  };

  handleThumbnailCreated = file => {
    console.log("file handleThumbnailCreated", file);
  };

  _getAuthorsOptions(authors) {
    return authors.map(author => {
      return {
        _id: author._id,
        name: `${author.name} ${author.surname}`
      };
    });
  }

  render() {
    const { data: book } = this.props;
    return (
      <div>
        <h1>Edit Book: {book.title}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.rednderDropzone(
            "image",
            "Image",
            "/api/files",
            this.handleAddFile,
            this.handleUploaded,
            this.handleUploadError,
            this.handleThumbnailCreated
          )}
          {this.renderSelect("genreId", "Genre", this.props.genres)}
          {this.renderMultiSelect(
            "authors",
            "Authors",
            this._getAuthorsOptions(this.props.authors),
            6
          )}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = store => {
  const { data, errors } = store.booksState;
  const { genres } = store.genresState;
  const { authors } = store.authorsState;

  return {
    data,
    errors,
    genres,
    authors
  };
};

const mapDispatchToProps = {
  getGenres,
  getAuthors,
  getBook,
  updateFormData,
  updateFormErrors,
  saveBook
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);

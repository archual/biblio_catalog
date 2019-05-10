import React from "react";
import Joi from "joi-browser";
import { isbnJoi } from "../utils/isbnValidation";
import Form from "./common/form";
import { connect } from "react-redux";
import { getGenres } from "../actions/genresActions";
import { getAuthors } from "../actions/authorsActions";

import {
  getBook,
  setFormData,
  updateFormData,
  updateFormErrors,
  saveBook
} from "../actions/booksActions";

class BookForm extends Form {
  schema = {
    _id: Joi.string().empty(""),
    title: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    image: Joi.string()
      .empty("")
      .label("Image"),
    authors: Joi.array()
      .min(1)
      .required()
      .label("Authors"),
    pages: Joi.number()
      .min(1)
      .max(1000)
      .label("Number of pages"),
    publisher: Joi.string()
      .empty("")
      .max(30)
      .label("Publisher"),
    publishedYear: Joi.number()
      .min(1800)
      .max(2100)
      .label("Year of published"),
    published: Joi.date()
      .min("01-01-1800")
      .label("Publication date"),
    isbn: isbnJoi
      .isbn()
      .min(10)
      .max(13)
      .regex(/^[0-9]+$/, "numbers")
      .valid()
      .label("ISBN")
  };

  componentDidMount() {
    this.props.getGenres();
    this.props.getAuthors();

    const bookId = this.props.match.params.id;
    const params = new URLSearchParams(this.props.location.search);
    const authorAdded = params.get("authorAdded");

    if (authorAdded) {
      return;
    }

    if (bookId === "new") {
      this.props.setFormData({});
      return;
    }

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
    const input = {
      name: "image",
      value: file.src
    };

    this.handleChange({ currentTarget: input });
    console.log("file handleThumbnailCreated", file);
  };

  _getAuthorsOptions = authors => {
    return authors.map(author => {
      return {
        _id: author._id,
        name: `${author.name} ${author.surname}`
      };
    });
  };

  handleAddAuthor = e => {
    e.preventDefault();

    this.props.history.push(`/authors/new?redirectUrl=${this.props.match.url}`);
  };

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
          <div>
            {this.renderMultiSelect(
              "authors",
              "Authors",
              this._getAuthorsOptions(this.props.authors),
              6
            )}
            {this.renderSimpleButton("Add Author", this.handleAddAuthor)}
          </div>
          {this.renderInput("pages", "Number of pages")}
          {this.renderInput("publisher", "Publisher")}
          {this.renderInput("publishedYear", "Year of published")}
          {this.renderInput("published", "Publication date", "date")}
          {this.renderInput("isbn", "ISBN")}
          {this.renderSubmitButton("Save")}
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
  setFormData,
  updateFormData,
  updateFormErrors,
  saveBook
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);

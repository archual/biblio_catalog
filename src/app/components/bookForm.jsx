import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { connect } from "react-redux";
import { getGenres } from "../services/fakeGenreService";
import {
  getBook,
  updateFormData,
  updateFormErrors,
  saveBook
} from "../actions/booksActions";

class BookForm extends Form {
  state = {
    genres: []
  };

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
    authors: Joi.any()
      .required()
      .label("Authors")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

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
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderSelect("authors", "Authors", this.state.genres)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = store => {
  const { data, errors } = store.booksState;
  const { genres } = store.genresState;

  return {
    data,
    errors,
    genres
  };
};

const mapDispatchToProps = {
  getBook,
  updateFormData,
  updateFormErrors,
  saveBook
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);

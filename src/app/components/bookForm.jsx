import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getBook, saveBook } from "../services/fakeBookService";
import { getGenres } from "../services/fakeGenreService";

class BookForm extends Form {
  state = {
    data: {
      title: "",
      genreId: ""
    },
    genres: [],
    errors: {}
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
      .label("Genre")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const bookId = this.props.match.params.id;
    if (bookId === "new") return;

    const book = getBook(bookId);
    if (!book) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(book) });
  }

  mapToViewModel(book) {
    return {
      _id: book._id,
      title: book.title,
      genreId: book.genre._id
    };
  }

  doSubmit = () => {
    saveBook(this.state.data);

    this.props.history.push("/books");
  };

  render() {
    const { data: book } = this.state;
    return (
      <div>
        <h1>Edit Book: {book.title}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BookForm;

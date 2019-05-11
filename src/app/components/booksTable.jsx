import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Table from "./common/table";

class BooksTable extends Component {
  columns = [
    {
      path: "image",
      label: "Image",
      content: book =>
        book.image ? <img src={book.image} alt={book.title} /> : null
    },
    {
      path: "title",
      label: "Title",
      content: book => <Link to={`/books/${book._id}`}>{book.title}</Link>,
      sorting: true
    },
    { path: "genre.name", label: "Genre" },
    {
      path: "publishedYear",
      label: "Year of published",
      sorting: true
    },
    {
      path: "info",
      label: "Book's info",
      content: book => {
        const authors = book.authors
          .map(author => `${author.name} ${author.surname}`)
          .join(", ");
        const published = moment(book.published).format("YYYY-MM-DD");

        return (
          <React.Fragment>
            <p>
              <span className="title">Authors:</span> {authors}
            </p>
            <p>
              <span className="title">Pages:</span> {book.pages}
            </p>
            <p>
              <span className="title">Publisher:</span> {book.publisher}
            </p>
            <p>
              <span className="title">Published:</span> {published}
            </p>
            <p>
              <span className="title">ISBN:</span> {book.isbn}
            </p>
          </React.Fragment>
        );
      }
    },
    {
      path: "delete",
      key: "delete",
      content: book => (
        <button
          onClick={() => this.props.onDelete(book)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { books, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={books}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BooksTable;

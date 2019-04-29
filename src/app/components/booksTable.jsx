import React, { Component } from "react";
import { Link } from "react-router-dom";
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

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class BooksTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: Book => <Link to={`/Books/${Book._id}`}>{Book.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    {
      key: "delete",
      content: Book => (
        <button
          onClick={() => this.props.onDelete(Book)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { Books, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={Books}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BooksTable;

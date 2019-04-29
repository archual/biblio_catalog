import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class AuthorsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: author => (
        <Link to={`/authors/${author._id}`}>{`${author.name} ${
          author.surname
        }`}</Link>
      ),
      sorting: true
    },
    {
      key: "delete",
      content: author => (
        <button
          onClick={() => this.props.onDelete(author)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { authors, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={authors}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default AuthorsTable;

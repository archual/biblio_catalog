import React, { Component } from "react";

class TableHeader extends Component {
  sort = column => {
    if (!column.sorting) {
      return;
    }

    const { path } = column;
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  handleClearSort = () => {
    this.props.onSort("");
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) {
      return null;
    }

    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc" />;
    }

    return <i className="fa fa-sort-desc" />;
  };

  renderClearSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) {
      return null;
    }

    return <i className="fa fa-ban pointer" onClick={this.handleClearSort} />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th key={column.path || column.key}>
              <span
                className={column.sorting && "clickable"}
                onClick={() => this.sort(column)}
              >
                {column.label}
              </span>
              &nbsp;
              {this.renderSortIcon(column)}&nbsp;
              {this.renderClearSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

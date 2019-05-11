import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AuthorsTable from "./authorsTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { paginate } from "../utils/paginate";
import { getAuthors } from "../actions/authorsActions";
import {
  setSortColumn,
  setCurrentPage,
  setSearchQuery
} from "../actions/tableActions";

import _ from "lodash";

class Authors extends Component {
  componentDidMount() {
    this.props.getAuthors();
  }

  handleDelete = author => {
    const authors = this.props.authors.filter(m => m._id !== author._id);
    this.props.setAuthors(authors);
  };

  handlePageChange = page => {
    this.props.setCurrentPage(page);
  };

  handleSearch = query => {
    this.props.setSearchQuery(query);
    this.props.setCurrentPage(1);
  };

  handleSort = sortColumn => {
    this.props.setSortColumn(sortColumn);
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      authors: allAuthors
    } = this.props;

    let filtered = allAuthors;

    if (searchQuery) {
      filtered = allAuthors.filter(m =>
        `${m.name} ${m.surname}`
          .toLowerCase()
          .startsWith(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const authors = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: authors };
  };

  render() {
    const { length: count } = this.props.authors;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.props;

    if (count === 0) return <p>There are no Authors in the database.</p>;

    const { totalCount, data: authors } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <p>Showing {totalCount} authors in the database.</p>
          <div className="form-row align-items-center">
            <div className="col">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
            </div>
            <Link className="btn btn-primary col-md-3" to="/authors/new">
              Add new
            </Link>
          </div>
          <AuthorsTable
            authors={authors}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  const { authors } = store.authorsState;
  const { currentPage, pageSize, sortColumn, searchQuery } = store.tableState;

  return {
    authors,
    currentPage,
    pageSize,
    sortColumn,
    searchQuery
  };
};

const mapDispatchToProps = {
  getAuthors,
  setSortColumn,
  setCurrentPage,
  setSearchQuery
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authors);

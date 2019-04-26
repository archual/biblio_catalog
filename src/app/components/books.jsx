import React, { Component } from "react";
import { connect } from "react-redux";
import BooksTable from "./booksTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { getBooks } from "../services/fakeBookService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import { setBooks } from "../actions/booksActions";
import { setGenres, setSelectedGenre } from "../actions/genresActions";
import {
  setSortColumn,
  setCurrentPage,
  setSearchQuery
} from "../actions/tableActions";

import _ from "lodash";

const allGenres = { _id: "", name: "All Genres" };

class Books extends Component {
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    const books = getBooks();

    this.props.setBooks(books);
    this.props.setGenres(genres);
  }

  handleDelete = book => {
    const books = this.props.books.filter(m => m._id !== book._id);
    this.props.setBooks(books);
  };

  handlePageChange = page => {
    this.props.setCurrentPage(page);
  };

  handleGenreSelect = genre => {
    this.props.setSelectedGenre(genre);
    this.props.setCurrentPage(1);
    this.props.setSearchQuery("");
  };

  handleSearch = query => {
    this.props.setSearchQuery(query);
    this.props.setSelectedGenre(null);
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
      selectedGenre,
      searchQuery,
      books: allBooks
    } = this.props;

    let filtered = allBooks;

    if (searchQuery) {
      filtered = allBooks.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allBooks.filter(m => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const books = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: books };
  };

  render() {
    const { length: count } = this.props.books;
    const {
      genres,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      selectedGenre
    } = this.props;

    if (count === 0) return <p>There are no Books in the database.</p>;

    const { totalCount, data: books } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} books in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <BooksTable
            books={books}
            sortColumn={sortColumn}
            onLike={this.handleLike}
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
  const { books } = store.booksState;
  const { currentPage, pageSize, sortColumn, searchQuery } = store.tableState;
  const { genres, selectedGenre } = store.genresState;

  return {
    books,
    currentPage,
    pageSize,
    sortColumn,
    genres,
    selectedGenre,
    searchQuery
  };
};

const mapDispatchToProps = {
  setBooks,
  setSortColumn,
  setCurrentPage,
  setGenres,
  setSelectedGenre,
  setSearchQuery
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Books);

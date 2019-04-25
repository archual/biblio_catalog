import React, { Component } from "react";
import BooksTable from "./booksTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getBooks } from "../services/fakeBookService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Books extends Component {
  state = {
    Books: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    debugger;
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ Books: getBooks(), genres });
  }

  handleDelete = Book => {
    const Books = this.state.Books.filter(m => m._id !== Book._id);
    this.setState({ Books });
  };

  handleLike = Book => {
    const Books = [...this.state.Books];
    const index = Books.indexOf(Book);
    Books[index] = { ...Books[index] };
    Books[index].liked = !Books[index].liked;
    this.setState({ Books });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      Books: allBooks
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allBooks.filter(m => m.genre._id === selectedGenre._id)
        : allBooks;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const Books = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: Books };
  };

  render() {
    const { length: count } = this.state.Books;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no Books in the database.</p>;

    const { totalCount, data: Books } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} Books in the database.</p>
          <BooksTable
            Books={Books}
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

export default Books;

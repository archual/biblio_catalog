import * as types from "../constants/ActionTypes";
import {
  getBook as getBookFake,
  getBooks as getBooksFake,
  saveBook as saveBookFake
} from "../services/fakeBookService";
import history from "../utils/history";

export function getBooks() {
  return dispatch => {
    dispatch(request);

    setTimeout(() => {
      const books = getBooksFake();
      dispatch(success);
      dispatch(setBooks(books));
    }, 1000);
  };
}

export function setBooks(books) {
  return {
    type: types.SET_BOOKS,
    payload: books
  };
}

export function updateBook(book) {
  return {
    type: types.UPDATE_BOOK,
    payload: book
  };
}

export function deleteBook(id) {
  return {
    type: types.DELETE_BOOK,
    payload: book
  };
}

export function saveBook(book) {
  return dispatch => {
    // Save to BE. Emulating async for now.
    dispatch(request);

    setTimeout(() => {
      saveBookFake(book);
      dispatch(success);
    }, 500);
  };
}

export function getBook(bookId) {
  return dispatch => {
    // Get from BE. Emulating async for now.
    dispatch(request);

    setTimeout(() => {
      const book = getBookFake(bookId);

      if (!book) {
        dispatch(failure("not found"));
        return history.push("/not-found");
      }
      dispatch(success);
      dispatch(setFormData(book));
    }, 500);
  };
}

export function setFormData(book) {
  return dispatch => {
    const data = {
      _id: book._id || "",
      title: book.title || "",
      genreId: (book.genre && book.genre._id) || "",
      image: book.image || "",
      authors:
        (book.authors &&
          book.authors.length &&
          book.authors.map(author => author._id)) ||
        []
    };
    dispatch(updateFormData(data));
  };
}

export function updateFormData(data) {
  return {
    type: types.SET_BOOK_FORM_DATA,
    payload: data
  };
}

export function updateFormErrors(errors) {
  return {
    type: types.SET_BOOK_FORM_ERRORS,
    payload: errors
  };
}

export function request() {
  return {
    type: types.BOOK_REQUEST
  };
}

export function success() {
  return {
    type: types.BOOK_SUCCESS
  };
}

export function failure(error) {
  return {
    type: types.BOOK_FAILURE,
    payload: error
  };
}

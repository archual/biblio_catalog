import * as types from "../constants/ActionTypes";

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

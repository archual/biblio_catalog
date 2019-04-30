import update from "react-addons-update";
import * as types from "../constants/ActionTypes";
import { booksInitialState } from "../constants/configuration";

export default function booksReducer(state = booksInitialState, action) {
  switch (action.type) {
    case types.SET_BOOKS:
      return update(state, {
        books: {
          $set: action.payload
        }
      });

    case types.SET_BOOK_FORM_DATA:
      return update(state, {
        data: {
          $set: action.payload
        }
      });

    case types.SET_BOOK_FORM_ERRORS:
      return update(state, {
        errors: {
          $set: action.payload
        }
      });

    case types.BOOK_REQUEST:
      return update(state, {
        loading: {
          $set: true
        }
      });

    case types.BOOK_SUCCESS:
      return update(state, {
        loading: {
          $set: false
        }
      });

    case types.BOOK_FAILURE:
      return update(state, {
        loading: {
          $set: false
        },
        error: {
          $set: action.payload
        }
      });

    default:
      return state;
  }
}

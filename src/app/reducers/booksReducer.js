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

    default:
      return state;
  }
}

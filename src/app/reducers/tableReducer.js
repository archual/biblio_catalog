import update from "react-addons-update";
import * as types from "../constants/ActionTypes";
import { tableInitialState } from "../constants/configuration";

export default function tableReducer(state = tableInitialState, action) {
  switch (action.type) {
    case types.SET_SORT_COLUMN:
      return update(state, {
        sortColumn: {
          $set: action.payload
        }
      });

    case types.SET_CURRENT_PAGE:
      return update(state, {
        currentPage: {
          $set: action.payload
        }
      });

    case types.SET_SEARCH_QUERY:
      return update(state, {
        searchQuery: {
          $set: action.payload
        }
      });

    default:
      return state;
  }
}

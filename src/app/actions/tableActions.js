import * as types from "../constants/ActionTypes";

export function setSortColumn(sorting) {
  return {
    type: types.SET_SORT_COLUMN,
    payload: sorting
  };
}

export function setCurrentPage(page) {
  return {
    type: types.SET_CURRENT_PAGE,
    payload: page
  };
}

export function setSearchQuery(page) {
  return {
    type: types.SET_SEARCH_QUERY,
    payload: page
  };
}

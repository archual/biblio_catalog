import { combineReducers } from "redux";

// Reducers
import booksReducer from "./booksReducer";
import genresReducer from "./genresReducer";
import tableReducer from "./tableReducer";

// Combine Reducers
var reducers = combineReducers({
  booksState: booksReducer,
  genresState: genresReducer,
  tableState: tableReducer
});

export default reducers;

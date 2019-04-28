import { combineReducers } from "redux";

// Reducers
import booksReducer from "./booksReducer";
import authorsReducer from "./authorsReducer";
import genresReducer from "./genresReducer";
import tableReducer from "./tableReducer";

// Combine Reducers
var reducers = combineReducers({
  booksState: booksReducer,
  authorsState: authorsReducer,
  genresState: genresReducer,
  tableState: tableReducer
});

export default reducers;

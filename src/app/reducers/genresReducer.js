import update from "react-addons-update";
import * as types from "../constants/ActionTypes";
import { genresInitialState } from "../constants/configuration";

export default function booksReducer(state = genresInitialState, action) {
  switch (action.type) {
    case types.SET_GENRES:
      return update(state, {
        genres: {
          $set: action.payload
        }
      });

    case types.SET_SELECTED_GENRE:
      return update(state, {
        selectedGenre: {
          $set: action.payload
        }
      });

    case types.GENRE_REQUEST:
      return update(state, {
        loading: {
          $set: true
        }
      });

    case types.GENRE_SUCCESS:
      return update(state, {
        loading: {
          $set: false
        }
      });

    case types.GENRE_FAILURE:
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

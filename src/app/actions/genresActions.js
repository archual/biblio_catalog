import * as types from "../constants/ActionTypes";
import { getGenres as getGenresFake } from "../services/fakeGenreService";

export function getGenres() {
  return dispatch => {
    dispatch(request);

    setTimeout(() => {
      const genres = getGenresFake();
      dispatch(setGenres(genres));
      dispatch(success);
    }, 500);
  };
}

export function setGenres(genres) {
  return {
    type: types.SET_GENRES,
    payload: genres
  };
}

export function setSelectedGenre(genre) {
  return {
    type: types.SET_SELECTED_GENRE,
    payload: genre
  };
}

export function request() {
  return {
    type: types.GENRE_REQUEST
  };
}

export function success() {
  return {
    type: types.GENRE_SUCCESS
  };
}

export function failure(error) {
  return {
    type: types.GENRE_FAILURE,
    payload: error
  };
}

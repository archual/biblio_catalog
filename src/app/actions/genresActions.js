import * as types from "../constants/ActionTypes";

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

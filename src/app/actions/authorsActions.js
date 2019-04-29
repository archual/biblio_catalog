import * as types from "../constants/ActionTypes";

import {
  getAuthor as getAuthorFake,
  getAuthors as getAuthorsFake,
  saveAuthor as saveAuthorFake
} from "../services/fakeAuthorService";

export function getAuthors() {
  return dispatch => {
    dispatch(request);

    setTimeout(() => {
      const authors = getAuthorsFake();
      dispatch(success);
      dispatch(setAuthors(authors));
    }, 1000);
  };
}

export function setAuthors(authors) {
  return {
    type: types.SET_AUTHORS,
    payload: authors
  };
}

export function updateAuthor(author) {
  return {
    type: types.UPDATE_AUTHOR,
    payload: author
  };
}

export function deleteAuthor(id) {
  return {
    type: types.DELETE_AUTHOR,
    payload: author
  };
}

export function saveAuthor(author) {
  return dispatch => {
    // Save to BE. Emulating async for now.
    dispatch(request);

    setTimeout(() => {
      saveAuthorFake(author);
      dispatch(success);
    }, 500);
  };
}

export function getAuthor(authorId) {
  return dispatch => {
    // Get from BE. Emulating async for now.
    dispatch(request);

    setTimeout(() => {
      const author = getAuthorFake(authorId);

      if (!author) {
        dispatch(failure("not found"));
        return this.props.history.replace("/not-found");
      }
      dispatch(success);
      dispatch(setFormData(author));
    }, 500);
  };
}

export function setFormData(author) {
  return dispatch => {
    const data = {
      _id: author._id,
      name: author.name,
      surname: author.surname._id
    };
    dispatch(updateFormData(data));
  };
}

export function updateFormData(data) {
  return {
    type: types.SET_AUTHOR_FORM_DATA,
    payload: data
  };
}

export function updateFormErrors(errors) {
  return {
    type: types.SET_AUTHOR_FORM_ERRORS,
    payload: errors
  };
}

export function request() {
  return {
    type: types.SAVE_AUTHOR_REQUEST
  };
}

export function success() {
  return {
    type: types.SAVE_AUTHOR_SUCCESS
  };
}

export function failure(error) {
  return {
    type: types.SAVE_AUTHOR_FAILURE,
    payload: error
  };
}

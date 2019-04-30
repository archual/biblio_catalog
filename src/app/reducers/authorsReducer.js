import update from "react-addons-update";
import * as types from "../constants/ActionTypes";
import { authorsInitialState } from "../constants/configuration";

export default function authorsReducer(state = authorsInitialState, action) {
  switch (action.type) {
    case types.SET_AUTHORS:
      return update(state, {
        authors: {
          $set: action.payload
        }
      });

    case types.SET_AUTHOR_FORM_DATA:
      return update(state, {
        data: {
          $set: action.payload
        }
      });

    case types.SET_AUTHOR_FORM_ERRORS:
      return update(state, {
        errors: {
          $set: action.payload
        }
      });

    case types.AUTHOR_REQUEST:
      return update(state, {
        loading: {
          $set: true
        }
      });

    case types.AUTHOR_SUCCESS:
      return update(state, {
        loading: {
          $set: false
        }
      });

    case types.AUTHOR_FAILURE:
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

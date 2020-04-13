import { combineReducers } from 'redux';
import { ActionTypes } from './sessionActions';

const user = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SIGN_IN_SUCCESS:
    case ActionTypes.SIGN_UP_SUCCESS:
      return payload.response.userData;

    case ActionTypes.LOGOUT_SUCCESS:
      return {};

    default:
      return state;
  }
};

const token = (state = null, { type, payload }) => {
  switch (type) {
    case ActionTypes.SIGN_IN_SUCCESS:
    case ActionTypes.SIGN_UP_SUCCESS:
      return payload.response.token;

    case ActionTypes.LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};

const error = (state = null, { type, payload }) => {
  switch (type) {
    case ActionTypes.SIGN_UP_ERROR:
    case ActionTypes.SIGN_IN_ERROR:
    case ActionTypes.REFRESH_USER_ERROR:
      return payload.error;

    case ActionTypes.SIGN_IN_SUCCESS:
    case ActionTypes.SIGN_UP_SUCCESS:
    case ActionTypes.REFRESH_USER_SUCCESS:
    case ActionTypes.CLEAR_ERROR_MESSAGE:
      return null;

    default:
      return state;
  }
};

const authentificated = (state = false, { type }) => {
  switch (type) {
    case ActionTypes.SIGN_IN_SUCCESS:
    case ActionTypes.SIGN_UP_SUCCESS:
    case ActionTypes.REFRESH_USER_SUCCESS:
      return true;

    case ActionTypes.LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
};

const tokenDliaMarusi = (state = true, { type, payload }) => {
  switch (type) {
    case ActionTypes.SIGN_IN_SUCCESS:
    case ActionTypes.SIGN_UP_SUCCESS:
      return payload.response.token;
    case ActionTypes.REFRESH_USER_SUCCESS:
      return JSON.parse(localStorage.getItem('persist:root'))
        .token.split('')
        .filter(el => el !== '"')
        .join('');

    case ActionTypes.LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  token,
  error,
  authentificated,
  tokenDliaMarusi,
});

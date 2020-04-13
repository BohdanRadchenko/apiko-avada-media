import { combineReducers } from 'redux';
import { ActionType } from '../actionType';

const authenticationReducer = (state = false, { type, payload }) => {
  switch (type) {
    case ActionType.AUTHENTICATION_HANDLER:
      return payload;

    default:
      return state;
  }
};

const messageReducer = (state = true, { type, payload }) => {
  switch (type) {
    case ActionType.MESSAGE_HANDLER:
      return payload;

    default:
      return state;
  }
};


export default combineReducers({
  authentication : authenticationReducer,
  message : messageReducer,
});
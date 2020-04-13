import {ActionType} from '../actionType'

// FETCH USERS
export const fetchUsersRequest = () => ({
  type: ActionType.FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = users => ({
  type: ActionType.FETCH_USERS_SUCCESS,
  payload : {
    users,
  }
});

export const fetchUsersError = error => ({
  type: ActionType.FETCH_USERS_ERROR,
  payload : {
    error,
  }
});

// FETCH USERS BY ID
export const fetchUsersByIdRequest = () => ({
  type: ActionType.FETCH_USERS_BY_ID_REQUEST,
});

export const fetchUsersByIdSuccess = user => ({
  type: ActionType.FETCH_USERS_BY_ID_SUCCESS,
  payload : {
    user,
  }
});

export const fetchUsersByIdError = error => ({
  type: ActionType.FETCH_USERS_BY_ID_ERROR,
  payload : {
    error,
  }
});
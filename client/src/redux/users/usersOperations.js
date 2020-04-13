import axios from 'axios';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
  fetchUsersByIdRequest,
  fetchUsersByIdSuccess,
  fetchUsersByIdError,
} from './usersActions';

export const fetchUsers = page => dispatch => {
  dispatch(fetchUsersRequest());
  axios
    .get(`/api/users?page=${page}&count=50`)
    .then(response => {
      dispatch(fetchUsersSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchUsersError(error));
    });
};

export const fetchUsersById = (id) => dispatch => {
  dispatch(fetchUsersByIdRequest());
  axios
    .get(`/api/users/${id}`)
    .then(response => {
      dispatch(fetchUsersByIdSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchUsersByIdError(error));
    });
};
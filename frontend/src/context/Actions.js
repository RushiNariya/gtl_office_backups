import {
  USER_LOGIN,
  USER_LOGOUT,
  REFRESH_STATE,
  SET_ERROR,
  RESET_ERROR,
} from './ActionTypes';

export const userLoginAction = (userData) => ({
  type: USER_LOGIN,
  payload: userData,
});

export const userLogoutAction = () => ({
  type: USER_LOGOUT,
  payload: null,
});

export const setErrorAction = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetErrorAction = () => ({
  type: RESET_ERROR,
  payload: null,
});

export const refreshStateAction = (state) => ({
  type: REFRESH_STATE,
  payload: state,
});

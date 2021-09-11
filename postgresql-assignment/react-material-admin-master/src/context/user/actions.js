export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_DETAILS = 'USER_DETAILS';

export const REFRESH_STATE = 'REFRESH_STATE';
export const SET_ERROR = 'SET_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

export const userLoginAction = (payload) => ({
  type: USER_LOGIN,
  payload,
});
export const userLogoutAction = () => ({
  type: USER_LOGOUT,
});
export const userDetailsAction = (payload) => ({
  type: USER_DETAILS,
  payload,
});
//-----------------

export const refreshStateAction = (payload) => ({
  type: REFRESH_STATE,
  payload,
});

export const setErrorAction = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetErrorAction = () => ({
  type: RESET_ERROR,
});

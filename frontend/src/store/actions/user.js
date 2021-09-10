import { toast } from 'react-toastify';
import {
  applyForgotPassword,
  changePassword,
  loginUser,
  registerUser,
} from '../../api/userApi';
import { SET_ERROR } from '../../context/ActionTypes';
import {
  APPLY_FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_STATE,
  REGISTER_USER,
  RESET_ERROR,
} from './types/user';

export const loginAction = (loginDetails) => (dispatch) => {
  loginUser(loginDetails)
    .then(async (res) => {
      console.log(res);
      if (!res.data.error) {
        const { token, id, role } = res.data.data;
        console.log(res.data);
        await localStorage.setItem('token', token);
        await localStorage.setItem('userId', id);
        await localStorage.setItem('role', role);
        dispatch({
          type: LOGIN_USER,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: res.data.error,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: SET_ERROR,
        payload: 'Internal Server Error',
      });
    });
};

export const registerAction = (registerDetails) => (dispatch) => {
  registerUser(registerDetails)
    .then((res) => {
      if (res.data.status === 201) {
        dispatch({
          type: REGISTER_USER,
        });
      } else {
        toast.error(res.data.error);
        dispatch({
          type: SET_ERROR,
          payload: res.data.error,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: SET_ERROR,
        payload: 'Internal Server Error',
      });
    });
};

export const applyForgotPasswordAction = (email) => (dispatch) => {
  applyForgotPassword(email)
    .then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        dispatch({
          type: APPLY_FORGOT_PASSWORD,
          payload: res.data.data.message,
        });
      } else {
        toast.error(res.data.error);
        dispatch({
          type: SET_ERROR,
          payload: res.data.error,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: SET_ERROR,
        payload: 'Internal Server Error',
      });
    });
};

export const changePasswordAction = (passwordDetails, token) => (dispatch) => {
  changePassword(passwordDetails, token)
    .then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        dispatch({
          type: CHANGE_PASSWORD,
          payload: 'Changed Password Successfully',
        });
      } else {
        toast.error(res.data.error);
        dispatch({
          type: SET_ERROR,
          payload: res.data.error,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payload: 'Internal Server Error',
      });
    });
};

export const resetErrorAction = () => (dispatch) => {
  dispatch({
    type: RESET_ERROR,
    payload: null,
  });
};

export const logoutUserAction = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
    payload: null,
  });
};

export const refreshStateAction = () => (dispatch) => {
  const newToken = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null;
  const newUserId = localStorage.getItem('userId')
    ? localStorage.getItem('userId')
    : null;
  const role = localStorage.getItem('role')
    ? localStorage.getItem('role')
    : null;
  const state = {
    token: newToken,
    userId: newUserId,
    role,
  };
  dispatch({
    type: REFRESH_STATE,
    payload: state,
  });
};

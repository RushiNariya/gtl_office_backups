import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  userDetailsAction,
  userLoginAction,
  refreshStateAction,
  userLogoutAction,
  setErrorAction,
  resetErrorAction,
} from './actions';
import { userReducer } from './reducer';

const userInitialState = {
  details: null,
  token: null,
  userId: null,
  role: null,
  error: '',
};

export const userContext = createContext(userInitialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  const userDetails = (payload) => {
    dispatch(userDetailsAction(payload));
  };
  const userLogin = (payload) => {
    dispatch(userLoginAction(payload));
  };
  const userLogout = () => {
    dispatch(userLogoutAction());
  };
  const errorHandler = (payload) => {
    dispatch(setErrorAction(payload));
  };
  const resetSetErrorHandler = () => {
    dispatch(resetErrorAction());
  };

  function refreshState() {
    const refreshedState = localStorage.getItem('state')
      ? JSON.parse(localStorage.getItem('state'))
      : { token: state.token, userId: state.userId, role: state.role };
    dispatch(refreshStateAction(refreshedState));
  }

  useEffect(() => {
    refreshState();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'state',
      JSON.stringify({ token: state.token, userId: state.userId, role: state.role }),
    );
  }, [state]);
  return (
    <userContext.Provider
      value={{
        token: state.token,
        userId: state.userId,
        error: state.error,
        role: state.role,
        userDetails,
        userLogin,
        userLogout,
        resetSetErrorHandler,
        errorHandler,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

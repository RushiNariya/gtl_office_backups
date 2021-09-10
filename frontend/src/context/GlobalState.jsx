import React, {
  useEffect, createContext, useContext, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import reducer, { initialState } from './Reducer';
import {
  userLoginAction,
  userLogoutAction,
  setErrorAction,
  resetErrorAction,
  refreshStateAction,
} from './Actions';

// Prepares the dataLayer
const GlobalContext = createContext();

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function userLogin(userData) {
    dispatch(userLoginAction(userData));
  }

  function userLogout() {
    dispatch(userLogoutAction());
  }

  function setError(error) {
    dispatch(setErrorAction(error));
  }

  function resetError() {
    dispatch(resetErrorAction());
  }

  function refreshState() {
    const newToken = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null;
    const newUserId = localStorage.getItem('userId')
      ? localStorage.getItem('userId')
      : null;
    const role = localStorage.getItem('role')
      ? localStorage.getItem('role')
      : null;
    dispatch(
      refreshStateAction({
        token: newToken,
        userId: newUserId,
        role,
      }),
    );
  }

  useEffect(() => {
    refreshState();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        hospitals: state.hospitals,
        hospitaladmins: state.hospitaladmins,
        token: state.token,
        userId: state.userId,
        role: state.role,
        error: state.error,
        userLogin,
        userLogout,
        setError,
        resetError,
        refreshState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Pull information from the data layer
export const useStateValue = () => useContext(GlobalContext);

GlobalState.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default GlobalState;

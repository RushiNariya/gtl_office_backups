import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getBlogsAction,
  getBlogByIdAction,
  userLoginAction,
  userRegistrationAction,
  refreshStateAction,
  userLogoutAction,
  setErrorAction,
  resetErrorAction,
  setFilteredBlogsAction,
  clearFilteredBlogsAction,
} from './actions';
import { reducer } from './reducer';

const initialState = {
  blogs: [],
  filteredBlogs: null,
  blog: null,
  token: null,
  userId: null,
  role: null,
  error: '',
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getBlogs = (payload) => {
    dispatch(getBlogsAction(payload));
  };
  const getBlogById = (payload) => {
    dispatch(getBlogByIdAction(payload));
  };
  const userLogin = (payload) => {
    dispatch(userLoginAction(payload));
  };
  const userLogout = (payload) => {
    dispatch(userLogoutAction(payload));
  };
  const userRegistration = (payload) => {
    dispatch(userRegistrationAction(payload));
  };
  const setFilteredBlogs = (payload) => {
    dispatch(setFilteredBlogsAction(payload));
  };
  const clearFilteredBlogs = () => {
    dispatch(clearFilteredBlogsAction());
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
    <GlobalContext.Provider
      value={{
        blogs: state.blogs,
        blog: state.blog,
        token: state.token,
        userId: state.userId,
        error: state.error,
        role: state.role,
        filteredBlogs: state.filteredBlogs,
        getBlogs,
        getBlogById,
        userLogin,
        userLogout,
        userRegistration,
        resetSetErrorHandler,
        errorHandler,
        setFilteredBlogs,
        clearFilteredBlogs,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

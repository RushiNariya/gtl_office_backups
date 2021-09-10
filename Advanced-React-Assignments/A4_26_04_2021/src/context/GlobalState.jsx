import React, { createContext, useReducer, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import AppReducer from './AppReducer';
import {
  addTransactionAction,
  deleteTransactionAction,
  setErrorAction,
  resetErrorAction,
  refreshStateAction,
} from './AppAction';

const initialState = {
  transactions: [],
  totalIncome: 0,
  totalExpense: 0,
  error: '',
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function deleteTransaction(transaction) {
    dispatch(deleteTransactionAction(transaction));
  }
  function addTransaction(transaction) {
    dispatch(addTransactionAction(transaction));
  }
  function errorHandler(error) {
    dispatch(setErrorAction(error));
  }
  function resetSetErrorHandler() {
    dispatch(resetErrorAction());
  }

  function refreshState() {
    const refreshedState = localStorage.getItem('state')
      ? JSON.parse(localStorage.getItem('state'))
      : initialState;
    dispatch(refreshStateAction(refreshedState));
  }

  useEffect(() => {
    refreshState();
  }, []);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        totalIncome: state.totalIncome,
        totalExpense: state.totalExpense,
        deleteTransaction,
        addTransaction,
        errorHandler,
        resetSetErrorHandler,
        refreshState,
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

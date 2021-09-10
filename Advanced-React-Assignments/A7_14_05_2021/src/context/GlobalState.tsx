import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppReducer from './AppReducer';
import {
  addTransactionAction,
  deleteTransactionAction,
  setErrorAction,
  resetErrorAction,
  refreshStateAction,
} from './AppAction';

export type trans = {
  id: number;
  text: string;
  amount: number;
};

export type initState = {
  transactions: Array<trans>;
  totalIncome: number;
  totalExpense: number;
  error: string;
  deleteTransaction: (transaction: trans) => void;
  addTransaction: (transaction: trans) => void;
  errorHandler: (error: string) => void;
  resetSetErrorHandler: () => void;
  refreshState: () => void;
};

const initialState: initState = {
  transactions: [],
  totalIncome: 0,
  totalExpense: 0,
  error: '',
  deleteTransaction: (transaction) => {},
  addTransaction: (transaction) => {},
  errorHandler: (error) => {},
  resetSetErrorHandler: () => {},
  refreshState: () => {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }: any): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function deleteTransaction(transaction: trans): void {
    dispatch(deleteTransactionAction(transaction));
  }
  function addTransaction(transaction: trans): void {
    dispatch(addTransactionAction(transaction));
  }
  function errorHandler(error: string): void {
    dispatch(setErrorAction(error));
  }
  function resetSetErrorHandler(): void {
    dispatch(resetErrorAction());
  }

  function refreshState(): void {
    const refreshedState = localStorage.getItem('state')
      ? JSON.parse(localStorage.getItem('state')!)
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

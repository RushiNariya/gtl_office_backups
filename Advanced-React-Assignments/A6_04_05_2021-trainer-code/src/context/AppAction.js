export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const SET_ERROR = 'SET_ERROR';
export const RESET_ERROR = 'RESET_ERROR';
export const REFRESH_STATE = 'REFRESH_STATE';

export const deleteTransactionAction = (transaction) => ({
  type: DELETE_TRANSACTION,
  payload: transaction,
});

export const addTransactionAction = (transaction) => ({
  type: ADD_TRANSACTION,
  payload: transaction,
});

export const setErrorAction = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const resetErrorAction = () => ({
  type: SET_ERROR,
  payload: { error: undefined },
});

export const refreshStateAction = (state) => ({
  type: REFRESH_STATE,
  payload: state,
});

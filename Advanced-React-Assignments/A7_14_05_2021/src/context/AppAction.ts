import { initState, trans } from './GlobalState';

export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const SET_ERROR = 'SET_ERROR';
export const RESET_ERROR = 'RESET_ERROR';
export const REFRESH_STATE = 'REFRESH_STATE';

export interface ActionMethodType {
  type: string;
  payload: trans | string | initState;
}

export const deleteTransactionAction = (
  transaction: trans
): ActionMethodType => ({
  type: DELETE_TRANSACTION,
  payload: transaction,
});

export const addTransactionAction = (transaction: trans): ActionMethodType => ({
  type: ADD_TRANSACTION,
  payload: transaction,
});

export const setErrorAction = (error: string): ActionMethodType => ({
  type: SET_ERROR,
  payload: error,
});

export const resetErrorAction = (): ActionMethodType => ({
  type: SET_ERROR,
  payload: '',
});

export const refreshStateAction = (state: initState): ActionMethodType => ({
  type: REFRESH_STATE,
  payload: state,
});

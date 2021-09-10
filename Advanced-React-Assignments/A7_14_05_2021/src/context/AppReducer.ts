import {
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  SET_ERROR,
  RESET_ERROR,
  REFRESH_STATE,
} from './AppAction';
import { initState, trans } from './GlobalState';

const AppReducer = (state: initState, action: any): initState => {
  switch (action.type) {
    case ADD_TRANSACTION:
      if (action.payload.amount > 0) {
        return {
          ...state,
          totalIncome: state.totalIncome + action.payload.amount,
          transactions: [action.payload, ...state.transactions!],
        };
      }
      return {
        ...state,
        totalExpense: state.totalExpense + action.payload.amount,
        transactions: [action.payload, ...state.transactions!],
      };

    case DELETE_TRANSACTION:
      if (action.payload.amount > 0) {
        return {
          ...state,
          totalIncome: state.totalIncome - action.payload.amount,
          transactions: state.transactions?.filter(
            (transaction: trans): boolean =>
              transaction.id !== action.payload.id
          ),
        };
      }
      return {
        ...state,
        totalExpense: state.totalExpense - action.payload.amount,
        transactions: state.transactions?.filter(
          (transaction: trans): boolean => transaction.id !== action.payload.id
        ),
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: '',
      };
    case REFRESH_STATE:
      return {
        ...action.payload,
        error: '',
      };
    default:
      return state;
  }
};

export default AppReducer;

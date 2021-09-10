import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_ERROR,
  RESET_ERROR,
  REFRESH_STATE,
} from './ActionTypes';

export const initialState = {
  hospitals: [],
  hospitalAdmins: [],
  token: '',
  role: '',
  userId: '',
  myself: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        role: action.payload.role,
      };
    case USER_LOGOUT:
      return {
        ...state,
        article: null,
        token: null,
        userId: null,
        role: null,
        filteredArticles: null,
        articles: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    case REFRESH_STATE:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        role: action.payload.role,
      };
    default:
      return state;
  }
};

export default reducer;

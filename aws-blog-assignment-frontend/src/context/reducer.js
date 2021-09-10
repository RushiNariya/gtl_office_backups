import {
  GET_BLOGS,
  USER_LOGIN,
  USER_REGISTRATION,
  REFRESH_STATE,
  USER_LOGOUT,
  GET_BLOG_BY_ID,
  RESET_ERROR,
  SET_ERROR,
  SET_FILTERED_BLOGS,
  CLEAR_FILTERED_BLOGS,
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case GET_BLOG_BY_ID:
      return {
        ...state,
        blog: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        userId: action.payload.id,
        token: action.payload.token,
        role: action.payload.role,
      };
    case USER_REGISTRATION:
      return {
        ...state,
      };
    case REFRESH_STATE:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        role: action.payload.role,
      };
    case USER_LOGOUT:
      localStorage.removeItem('state');
      return {
        ...state,
        blogs: null,
        blog: null,
        userId: null,
        token: null,
        role: null,
        filteredBlogs: null,
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
    case SET_FILTERED_BLOGS:
      return {
        ...state,
        filteredBlogs: action.payload,
      };
    case CLEAR_FILTERED_BLOGS:
      return {
        ...state,
        filteredBlogs: null,
      };
    default:
      return {
        ...state,
      };
  }
};

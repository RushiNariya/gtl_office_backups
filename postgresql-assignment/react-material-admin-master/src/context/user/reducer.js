import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_DETAILS,
  RESET_ERROR,
  SET_ERROR,
  REFRESH_STATE,
} from "./actions";

export const userReducer = (state, action) => {
  switch (action.type) {
    case USER_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        userId: action.payload.id,
        token: action.payload.token,
        role: action.payload.role,
      };
    case REFRESH_STATE:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        role: action.payload.role,
      };
    case USER_LOGOUT:
      localStorage.removeItem("state");
      return {
        ...state,
        userId: null,
        token: null,
        role: null,
        details: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return {
        ...state,
      };
  }
};

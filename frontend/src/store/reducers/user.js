import {
  APPLY_FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_STATE,
  REGISTER_USER,
  RESET_ERROR,
  SET_ERROR,
  SET_SUCCESS,
} from '../actions/types/user';

const initialState = {
  token: '',
  userId: '',
  role: '',
  error: '',
  success: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log(action.payload);
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.id,
        role: action.payload.role,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        success: null,
      };
    case SET_SUCCESS:
      return {
        ...state,
        error: null,
        success: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        success: 'Patient Registered Successfully',
        error: null,
      };
    case APPLY_FORGOT_PASSWORD:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
        success: null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        token: null,
        userId: null,
        role: null,
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
}

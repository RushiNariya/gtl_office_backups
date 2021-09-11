/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  SEARCH_BY_CITY,
  SEARCH_CITY,
  SET_WEATHER_DATA,
  SET_ERROR,
  RESET_ERROR,
  REMOVE_CITY,
  REFRESH_STATE,
} from './actionTypes';
import { initState } from './InitialState';

const AppReducer = (state: initState, action: any): initState => {
  switch (action.type) {
    case SEARCH_BY_CITY:
      return {
        ...state,
      };
    case SET_WEATHER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SEARCH_CITY:
      if (state.city.find((item) => item.name === action.payload.name)) {
        return state;
      }
      return {
        ...state,
        city: [...state.city, action.payload],
      };
    case REMOVE_CITY:
      return {
        ...state,
        data: {},
        city: state.city.filter((item) => item.name !== action.payload),
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
        ...state,
        city: action.payload,
        error: '',
      };
    default:
      return state;
  }
};

export default AppReducer;

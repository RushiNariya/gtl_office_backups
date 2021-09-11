import cityInfo from '../intefaces/cityInfo';
import weatherInfo from '../intefaces/weatherInfo';
import {
  REFRESH_STATE,
  REMOVE_CITY,
  RESET_ERROR,
  SEARCH_BY_CITY,
  SEARCH_CITY,
  SET_ERROR,
  SET_WEATHER_DATA,
} from './actionTypes';
import { initState } from './InitialState';

export interface ActionMethodType {
  type: string;
  payload: weatherInfo | string | initState | Array<cityInfo>;
}

export const searchByCityAction = (data: weatherInfo): ActionMethodType => ({
  type: SEARCH_BY_CITY,
  payload: data,
});

export const setWeatherDataAction = (data: weatherInfo): ActionMethodType => ({
  type: SET_WEATHER_DATA,
  payload: data,
});

export const searchCityAction = (data: cityInfo): ActionMethodType => ({
  type: SEARCH_CITY,
  payload: data,
});

export const removeCityAction = (city: string): ActionMethodType => ({
  type: REMOVE_CITY,
  payload: city,
});

export const setErrorAction = (error: string): ActionMethodType => ({
  type: SET_ERROR,
  payload: error,
});

export const resetErrorAction = (): ActionMethodType => ({
  type: RESET_ERROR,
  payload: '',
});

export const refreshStateAction = (
  state: Array<cityInfo>
): ActionMethodType => ({
  type: REFRESH_STATE,
  payload: state,
});

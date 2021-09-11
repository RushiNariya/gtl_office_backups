/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from "react";
import cityInfo from "../intefaces/cityInfo";
import weatherInfo from "../intefaces/weatherInfo";

export type initState = {
  data: weatherInfo;
  city: Array<cityInfo>;
  error: string;
  searchByCityHandler: (data: weatherInfo) => void;
  searchCityHandler: (data: cityInfo) => void;
  setWeatherDataHandler: (data: weatherInfo) => void;
  errorHandler: (error: string) => void;
  resetSetErrorHandler: () => void;
  removeCityHandler: (city: string) => void;
};
  
const initialState: initState = {
  data: {},
  city: [],
  error: '',
  searchByCityHandler: (data) => {},
  searchCityHandler: (data) => {},
  setWeatherDataHandler: (data) => {},
  errorHandler: (error) => {},
  resetSetErrorHandler: () => {},
  removeCityHandler: (city) => {},
};

export const GlobalContext = createContext(initialState);

export default initialState;
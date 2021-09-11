/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppReducer from './reducer';
import {
  searchByCityAction,
  searchCityAction,
  setWeatherDataAction,
  setErrorAction,
  resetErrorAction,
  removeCityAction,
  refreshStateAction,
} from './actions';
import weatherInfo from '../intefaces/weatherInfo';
import cityInfo from '../intefaces/cityInfo';
import { GlobalContext, initState } from './InitialState';


type props = {
  children: any;
  initialState: initState;
};

export const GlobalProvider = ({ children, initialState }: props): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function searchByCityHandler(data: weatherInfo): void {
    dispatch(searchByCityAction(data));
  }
  function searchCityHandler(city: cityInfo): void {
    dispatch(searchCityAction(city));
  }
  function removeCityHandler(city: string): void {
    dispatch(removeCityAction(city));
  }
  function setWeatherDataHandler(data: weatherInfo): void {
    dispatch(setWeatherDataAction(data));
  }
  function errorHandler(error: string): void {
    dispatch(setErrorAction(error));
  }
  function resetSetErrorHandler(): void {
    dispatch(resetErrorAction());
  }

  function refreshState(): void {
    const refreshedState: Array<cityInfo> = localStorage.getItem('state')
      ? JSON.parse(localStorage.getItem('state')!)
      : initialState.city;
    dispatch(refreshStateAction(refreshedState));
  }

  useEffect(() => {
    refreshState();
  }, []);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state.city));
  }, [state]);

  return (
    <GlobalContext.Provider
      value={{
        data: state.data,
        city: state.city,
        error: state.error,
        searchByCityHandler,
        searchCityHandler,
        setWeatherDataHandler,
        errorHandler,
        resetSetErrorHandler,
        removeCityHandler,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

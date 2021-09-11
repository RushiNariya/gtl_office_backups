/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { GlobalProvider } from '../context/GlobalState';
import CityModal from '../components/WeatherData/CityData/CityModal/CityModal';
import initialState from '../context/InitialState';

let wrapped: ReactWrapper;

initialState.data = {
  city: 'surat',
  country: 'IN',
  description: 'cloud heavy rain',
  clouds: 23,
  wind: 34,
  latitude: 32.04,
  longitude: 38.0,
  icon: '10d',
};

const city = {
  name: 'Pune',
  temp: 32.04,
  icon: '50d',
  latitude: 21.0439,
  longitude: 74.5086,
  minTemp: 33.04,
  maxTemp: 31.04,
  country: 'IN',
};

beforeEach((): void => {
  wrapped = mount(
    <GlobalProvider initialState={initialState}>
      <CityModal show={true} setShow={() => false} cityData={city} />
    </GlobalProvider>
  );
});

it('shows a Modal child component lists', (): void => {
  expect(wrapped.find('HourlyData').length).toEqual(1);
  expect(wrapped.find('DailyData').length).toEqual(1);
  expect(wrapped.find('CurrentData').length).toEqual(1);
});

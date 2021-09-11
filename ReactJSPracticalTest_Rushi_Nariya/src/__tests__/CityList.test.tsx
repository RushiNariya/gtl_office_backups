/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import CityList from '../components/WeatherData/CityList';
import { GlobalProvider } from '../context/GlobalState';
import initialState from '../context/InitialState';

let wrapped: ReactWrapper;

initialState.city = [
  {
    name: 'Sarkhej',
    temp: 31.04,
    icon: '50d',
    latitude: 23.0439,
    longitude: 72.5086,
    minTemp: 31.04,
    maxTemp: 31.04,
    country: 'IN',
  },
  {
    name: 'Pune',
    temp: 32.04,
    icon: '50d',
    latitude: 21.0439,
    longitude: 74.5086,
    minTemp: 33.04,
    maxTemp: 31.04,
    country: 'IN',
  },
];

describe('Test Case For CityList Component', (): void => {
  beforeEach((): void => {
    wrapped = mount(
      <GlobalProvider initialState={initialState}>
        <CityList />
      </GlobalProvider>
    );
  });

  afterEach((): void => {
    wrapped.unmount();
  });

  it('renders the CityList component', (): void => {
    expect(wrapped).toMatchSnapshot();
  });

  it('check city list data length', (): void => {
    expect(wrapped.find('li').length).toEqual(2);
  });

  it('check correct data render on city list', (): void => {
    expect(wrapped.render().text()).toContain('Sarkhej');
    expect(wrapped.render().text()).toContain('Pune');
  });
});

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from '../components/App';
import AppTitle from '../components/AppTitle/AppTitle';
import SearchCity from '../components/SearchCity/SearchCity';
import WeatherData from '../components/WeatherData/CityList';


let wrapped: ShallowWrapper;

beforeEach((): void => {
  wrapped = shallow(<App />);
});

it('renders the APP component', (): void => {
  expect(wrapped).toMatchSnapshot();
});

it('shows AppTitle', (): void => {
  expect(wrapped.find(AppTitle).length).toEqual(1);
});

it('shows SearchCity', (): void => {
  expect(wrapped.find(SearchCity).length).toEqual(1);
});

it('shows WeatherData', (): void => {
  expect(wrapped.find(WeatherData).length).toEqual(1);
});
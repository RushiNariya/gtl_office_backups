/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import City from '../components/WeatherData/CityData/City';
import { GlobalProvider } from '../context/GlobalState';
import initialState from '../context/InitialState';
import cityInfo from '../intefaces/cityInfo';

let wrapped: ReactWrapper;

initialState.city = [
  {
    name: 'rajkot',
    temp: 32.04,
    icon: '50d',
    latitude: 21.0439,
    longitude: 74.5086,
    minTemp: 33.04,
    maxTemp: 31.04,
    country: 'IN',
  },
  {
    name: 'surat',
    temp: 32.04,
    icon: '50d',
    latitude: 21.0439,
    longitude: 74.5086,
    minTemp: 33.04,
    maxTemp: 31.04,
    country: 'IN',
  }
];

const city: cityInfo = {
  name: 'surat',
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
      <City cityData={city} />
    </GlobalProvider>
  );
});

afterEach((): void => {
  wrapped.unmount();
});

describe('Test Case For City Component', (): void => {

  it('renders the City component', (): void => {
    expect(wrapped).toMatchSnapshot();
  });

  it('check article tag', (): void => {
    expect(wrapped.find('article').length).toEqual(1);
  });

  it('check correct data rendered in City Component ', (): void => {
    expect(wrapped.find('.units').text()).toEqual("32.04");
  });
});

describe('without click on city Component', (): void => {

  it('check cityModel does not render on without click', () => {
    expect(wrapped.find('CityModal').length).toEqual(0);
  });

});

describe('when click on city Component', (): void => {
  beforeEach(() => {
    wrapped
      .find('article')
      .simulate('click');
      wrapped.update();
  });

  it('check cityModel render on click', (): void => {
    expect(wrapped.find('CityModal').length).toEqual(1);
  });

});

describe('delete city from the list', (): void => {
  beforeEach(() => {
    wrapped
      .find('.cancel-button')
      .simulate('click');
      wrapped.update();
  });
  it('delete city on click', (): void => {
    expect(wrapped.find('.city').length).toEqual(1);
  })
});
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import SearchCity from '../components/SearchCity/SearchCity';
import { GlobalProvider } from '../context/GlobalState';
import initialState from '../context/InitialState';

let wrapped: ReactWrapper;

beforeEach((): void => {
  wrapped = mount(
    <GlobalProvider initialState={initialState}>
      <SearchCity />
    </GlobalProvider>
  );
});

afterEach((): void => {
  wrapped.unmount();
});

it('renders the SearchCity component', (): void => {
  expect(wrapped).toMatchSnapshot();
});

describe('check input search', (): void => {
  beforeEach((): void => {
    wrapped.find('input').simulate('change', { target: { value: 'New City' } });
    wrapped.update();
  });

  it('check correct data on input click', (): void => {
    expect(wrapped.find('input').prop('value')).toEqual('New City');
  });

  it('check when form is submitted, input search gets emptied', (): void => {
    wrapped.find('form').simulate('submit');
    wrapped.update();
    expect(wrapped.find('input').prop('value')).toEqual('');
  });
});

describe('check form render in SearchCity Component', (): void => {
  it('should render form and button', () => {
    expect(wrapped.find('form').length).toEqual(1);
    expect(wrapped.find('button').length).toEqual(1);
  });
});

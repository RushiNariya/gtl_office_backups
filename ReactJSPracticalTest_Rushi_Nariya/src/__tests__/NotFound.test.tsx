import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import NotFound from '../components/NotFound/NotFound';

test('renders the NotFound Component', (): void => {
  const component: ShallowWrapper = shallow(<NotFound />);
  expect(component).toMatchSnapshot();
});

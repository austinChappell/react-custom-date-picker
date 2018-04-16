import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DatePicker from '../lib/components/DatePicker';

test('should render correctly', () => {
  const wrapper = shallow(<DatePicker />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
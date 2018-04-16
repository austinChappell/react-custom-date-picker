import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DatePicker from '../lib/components/DatePicker';

const props = {
  color: '#0000ff',
  date: new Date('2017-08-14'),
  endDate: new Date('2017-09-01'),
  errorColor: '#ff0000',
  errorMessage: 'Invalid date',
  forceError: false,
  handleDateChange: () => { },
  hoverWeek: false,
  inputStyle: {},
  keepOpen: false,
  lightHeader: true,
  placeholder: 'This is the placeholder',
  range: true,
  required: true,
  startOfWeek: 1,
}

test('should render correctly', () => {
  const wrapper = shallow(<DatePicker {...props} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
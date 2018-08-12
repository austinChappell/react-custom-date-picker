# React Custom Date Picker

[![Build](https://circleci.com/gh/austinChappell/react-custom-date-picker/tree/master.svg?style=shield)](https://circleci.com/gh/austinChappell/react-custom-date-picker/tree/master)

A simple date picker that is customizable.

## Getting Started

### Install

    npm install react-custom-date-picker --save

or

    yarn add react-custom-date-picker

### Import

    import DatePicker from 'react-custom-date-picker';

### Dependencies

- moment

### Usage

This is the minimum requirement for using the react-custom-date-picker

#### Single Date Picker

    import React, { Component } from 'react';
    import DatePicker from 'react-custom-date-picker';

    class App extends Component {
      state = {
        date: null,
      }

      handleDateChange = (date) => {
        this.setState({ date });
      }

      render() {
        return (
          <DatePicker
            date={this.state.date}
            handleDateChange={this.handleDateChange}
          />
        );
      }
    }

    export default App;

#### Custom Theming

    import React, { Component } from 'react';
    import DatePicker from 'react-custom-date-picker';

    class App extends Component {
      state = {
        date: null,
      }

      handleDateChange = (date) => {
        this.setState({ date });
      }

      render() {
        return (
          <DatePicker
            color="#296b3e"
            date={this.state.date}
            errorColor="#c32c27"
            handleDateChange={this.handleDateChange}
            hoverWeek
            inputStyle={{
              borderRadius: 0,
            }}
            lightHeader
          />
        );
      }
    }

    export default App;

#### Date Range

    import React, { Component } from 'react';
    import DatePicker from 'react-custom-date-picker';

    class App extends Component {
      state = {
        date: null,
        endDate: null,
      }

      handleDateChange = ([date, endDate]) => {
        this.setState({
          date,
          endDate,
        });
      }

      render() {
        return (
          <DatePicker
            date={this.state.date}
            endDate={this.state.endDate}
            handleDateChange={this.handleDateChange}
            range
          />
        );
      }
    }

    export default App;

### Props

| Prop | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| color | The primary color of the date picker | String | '#46b2e9' | No |
| date | The date (or start date if using the 'range' prop) | Date Object | null | Yes |
| endDate | The end date if using the 'range' prop | Date Object | null | Yes |
| errorColor | The color displayed if date is invalid and using the 'required' prop | String | '#ff0000' | No |
| errorMessage | The error message to display if there is an error | String | 'Invalid Date' | No |
| forceError | How to generate an error without user blurring the input | Boolean | false | No |
| handleDateChange | Used to control value of date (or array of two dates if using 'range' prop) | Function | n/a | Yes |
| hoverWeek | Highlights entire week on hover | Boolean | false | No |
| inputStyle | All CSS attributes for input DOM element available | Object | {} | No |
| keepOpen | Prevent the calendar from closing on selection or outside click | Boolean | false | No |
| lightHeader | Use white font for header and selected date (recommend if 'color' prop is a dark color) | Boolean | false | No |
| maxDate | Set the max date allowed (as a string 'YYYY-MM-DD') | String | null | No |
| minDate | Set the min date allowed (as a string 'YYYY-MM-DD') | String | null | No |
| modal | Display the calendar in a modal view (does not work with the prop 'keepOpen') | Boolean | false | No |
| placeholder | Placeholder text for input | String | 'Date (MM/DD/YYYY)' | No |
| range | Allow user to select start date and end date | Boolean | false | No |
| required | Displays error on blur if date is invalid | Boolean | false | No |
| startOfWeek | Set the starting day of the week (0 = Sunday, 1 = Monday, etc.) | Number | 0 | No |
| width | Set width of datepicker window | Number | 400 | No |


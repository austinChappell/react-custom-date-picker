import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Calendar from './Calendar';

const propTypes = {
  color: PropTypes.string,
  date: PropTypes.objectOf(PropTypes.any),
  endDate: PropTypes.objectOf(PropTypes.any),
  errorColor: PropTypes.string,
  errorMessage: PropTypes.string,
  forceError: PropTypes.bool,
  handleDateChange: PropTypes.func.isRequired,
  hoverWeek: PropTypes.bool,
  inputStyle: PropTypes.objectOf(PropTypes.any),
  keepOpen: PropTypes.bool,
  lightHeader: PropTypes.bool,
  placeholder: PropTypes.string,
  range: PropTypes.bool,
  required: PropTypes.bool,
  startOfWeek: PropTypes.number,
};

const defaultProps = {
  color: '#46b2e9',
  date: null,
  endDate: null,
  errorColor: '#ff0000',
  errorMessage: 'Invalid Date',
  forceError: false,
  hoverWeek: false,
  inputStyle: {},
  keepOpen: false,
  lightHeader: false,
  placeholder: 'Date (MM/DD/YYYY)',
  range: false,
  required: false,
  startOfWeek: 0,
};

class DatePicker extends Component {
  state = {
    activated: false,
    calendarMonthIndex: 0,
    displayDate: '',
    showCalendar: false,
  };

  closeCalendar = () => {
    this.setState({ activated: true, showCalendar: false });
  }

  genFirstDay = (date) => {
    const month = moment(date).format('MM');
    const year = moment(date).format('YYYY');
    return `${year}-${month}-${"01"}`;
  }

  handleBlur = () => {
    const { displayDate } = this.state;
    const { range } = this.props;
    if (range) {
      const dates = displayDate.split('-');
      const startDate = dates[0] ? new Date(dates[0].trim()) : null;
      const endDate = dates[1] ? new Date(dates[1].trim()) : null;
      if (startDate != 'Invalid Date' && endDate != 'Invalid Date') {
        this.props.handleDateChange([startDate, endDate]);
      }
    } else {
      const date = new Date(displayDate);
      if (date != 'Invalid Date') {
        this.props.handleDateChange(date);
      }
    }
  }

  handleChange = (evt) => {
    const displayDate = evt.target.value;
    this.setState({ displayDate });
  };

  handleDateChange = (year, month, day) => {
    // only set one date
    if (!this.props.range) {
      const displayDate = `${month}/${day}/${year}`;
      const date = new Date(displayDate);
      this.setState({
        activated: true,
        calendarMonthIndex: 0,
        displayDate,
        showCalendar: false,
      }, () => {
        this.props.handleDateChange(date);
      });
      // set the start date or change start date and erase end date
    } else if ((this.props.date && this.props.endDate) || !this.props.date) {
      const displayDate = `${month}/${day}/${year}`;
      const date = new Date(displayDate);
      this.setState({
        activated: true,
        displayDate,
      }, () => {
        this.props.handleDateChange([date, null]);
      });
      // set the end date
    } else {
      const startDisplay = this.state.displayDate;
      const endDisplay = `${month}/${day}/${year}`;
      const displayDate = `${startDisplay} - ${endDisplay}`;
      const startDate = new Date(startDisplay);
      const endDate = new Date(endDisplay);
      this.setState({
        activated: true,
        calendarMonthIndex: 0,
        displayDate,
        showCalendar: false,
      }, () => {
        this.props.handleDateChange([startDate, endDate]);
      });
    }
  }

  moveIndex = (diff) => {
    const calendarMonthIndex = this.state.calendarMonthIndex + diff;
    this.setState({ calendarMonthIndex });
  }

  setMonthIndex = () => {
    const { date } = this.props;
    if (date) {
      const firstDayOfSelectedMonth = this.genFirstDay(date);
      const firstOfThisMonth = this.genFirstDay(new Date());
      const monthDiff = moment(firstDayOfSelectedMonth).diff(moment(firstOfThisMonth), 'months');
      return monthDiff;
    }
    return 0;
  }

  showCalendar = () => {
    const calendarMonthIndex = this.setMonthIndex();
    this.setState({
      calendarMonthIndex,
      showCalendar: true,
    });
  }

  render() {
    const {
      color,
      date,
      endDate,
      errorColor,
      errorMessage,
      forceError,
      hoverWeek,
      inputStyle,
      lightHeader,
      keepOpen,
      placeholder,
      range,
      required,
      startOfWeek,
    } = this.props;

    const {
      activated,
      calendarMonthIndex,
      displayDate,
      showCalendar,
    } = this.state;

    // split dates of multiple dates
    const dates = displayDate.split(' - ');
    let error = false;
    let hasForceError = false;
    dates.forEach((dateObj) => {
      const stringDate = JSON.stringify(new Date(dateObj));
      if (stringDate === 'null' && activated && required) {
        error = true;
      }
      if (stringDate === 'null' && forceError && required) {
        hasForceError = true;
      }
    });
    const errorFound = error || hasForceError;

    const errorStyle = {
      border: `1px solid ${errorColor}`,
    };

    const errorMessageDisplay =
      errorFound ? (
        <span
          className="error-message"
          style={{
            color: errorColor,
            marginTop: '5px',
          }}
        >
          {errorMessage}
        </span>
      ) : null;

    const defaultInputStyle = {
      border: '1px solid black',
      borderRadius: 4,
      minWidth: range ? 150 : 0,
      outline: 'none',
      padding: 5,
    };

    const mergedInputStyle = Object.assign({}, defaultInputStyle, inputStyle);
    const renderInputStyle = errorFound ?
      Object.assign({}, mergedInputStyle, errorStyle)
      : mergedInputStyle;

    const calendar = showCalendar || keepOpen ?
      (
        <Calendar
          calendarMonthIndex={calendarMonthIndex}
          closeCalendar={this.closeCalendar}
          color={color}
          date={date}
          endDate={endDate}
          handleDateChange={this.handleDateChange}
          hoverWeek={hoverWeek}
          lightHeader={lightHeader}
          moveIndex={this.moveIndex}
          range={range}
          startOfWeek={startOfWeek}
        />
      )
      : null;

    return (
      <div className="DatePicker">
        <div>
          <input
            className="date-picker-input"
            onBlur={this.handleBlur}
            onChange={evt => this.handleChange(evt)}
            onFocus={this.showCalendar}
            style={renderInputStyle}
            placeholder={placeholder}
            value={displayDate}
          />
          {calendar}
        </div>
        {errorMessageDisplay}
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;

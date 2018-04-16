import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import CalendarHeader from './CalendarHeader';
import DayHeader from './DayHeader';
import MonthDates from './MonthDates';

const propTypes = {
  calendarMonthIndex: PropTypes.number.isRequired,
  closeCalendar: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  date: PropTypes.objectOf(PropTypes.any),
  endDate: PropTypes.objectOf(PropTypes.any),
  handleDateChange: PropTypes.func.isRequired,
  hoverWeek: PropTypes.bool,
  lightHeader: PropTypes.bool,
  moveIndex: PropTypes.func.isRequired,
  range: PropTypes.bool.isRequired,
  startOfWeek: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.any),
  width: PropTypes.number,
};

const defaultProps = {
  date: null,
  hoverWeek: false,
  lightHeader: false,
  startOfWeek: 0,
  style: {},
  width: 400,
};

const dayNames = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
];

class Calendar extends Component {
  componentDidMount() {
    document.addEventListener('click', this.listenForClose);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listenForClose);
  }

  bubbleEvent = (target) => {
    const clickedInput = target.classList.contains('date-picker-input');
    const clickedCalendar = target.classList.contains('Calendar');
    if (!clickedInput && !clickedCalendar) {
      if (target.tagName === 'HTML') {
        this.props.closeCalendar();
      } else {
        this.bubbleEvent(target.parentElement);
      }
    }
  }

  genWeek = () => {
    const days = [0, 1, 2, 3, 4, 5, 6];
    const startOfWeek = [];
    const endOfWeek = [];
    days.forEach((num) => {
      if (num < this.props.startOfWeek) {
        endOfWeek.push(num);
      } else {
        startOfWeek.push(num);
      }
    });
    return [...startOfWeek, ...endOfWeek];
  }

  genMonthDates = (currentDate) => {
    const dateParam = new Date(currentDate);
    const thisYear = dateParam.getFullYear();
    const thisMonth = dateParam.getMonth();
    const daysInMonth = moment(dateParam).daysInMonth();
    const daysLastMonth = moment(dateParam).subtract(1, 'month').daysInMonth();
    const firstDay = moment(new Date(thisYear, thisMonth, 1)).day();

    const calendarDisplay = [];
    const dates = [];
    const daysByWeek = [];

    const week = this.genWeek();
    const firstOfMonthIndex = week.findIndex(d => d === firstDay);
    const startOfWeekIndex = week.findIndex(d => d === this.props.startOfWeek);

    // num days needed from prior month
    const startBufferLength = firstOfMonthIndex - startOfWeekIndex;

    // min number of boxes to appear on calendar
    const dayDisplayMin = startBufferLength + daysInMonth;

    // num days needed for next month
    const monthRemainder = dayDisplayMin % 7;
    const endBufferLength = monthRemainder > 0 ?
      7 - (monthRemainder) : 0;

    // total number of boxes to appear on calendar
    const calendarTotal = dayDisplayMin + endBufferLength;

    let dayCounter = 0;

    for (let i = 0; i < daysInMonth; i += 1) {
      dates[i] = String(i + 1).padStart(2, '0');
    }

    for (let i = 0; i < calendarTotal; i += 1) {
      const day = {};
      if (i < startBufferLength) {
        const diff = startBufferLength - (i + 1);
        const date = daysLastMonth - diff;
        day.month = 'previous';
        day.date = String(date).padStart(2, '0');
      } else if (i >= dayDisplayMin) {
        const date = i - (dayDisplayMin - 1);
        day.month = 'next';
        day.date = String(date).padStart(2, '0');
      } else {
        day.month = 'current';
        day.date = dates[dayCounter];
        dayCounter += 1;
      }
      calendarDisplay.push(day);
    }

    calendarDisplay.forEach((day, index) => {
      const weekIndex = Math.floor(index / 7);
      const currentWeek = daysByWeek[weekIndex] ? daysByWeek[weekIndex] : [];
      currentWeek.push(day);
      daysByWeek[weekIndex] = currentWeek;
    });

    return daysByWeek;
  }

  listenForClose = (evt) => {
    const { target } = evt;
    this.bubbleEvent(target);
  }

  render() {
    const {
      calendarMonthIndex,
      color,
      date: selectedDate,
      endDate,
      handleDateChange,
      hoverWeek,
      lightHeader,
      moveIndex,
      range,
      style,
      width,
    } = this.props;

    // calendar default style
    const defaultStyle = {
      backgroundColor: '#ffffff',
      boxShadow: '1px 1px 5px gray',
      position: 'absolute',
      width,
      zIndex: 1000,
    };

    // calendar wrapper style merged with props
    const wrapperStyle = Object.assign({}, defaultStyle, style);

    // get the width of each column
    const colWidth = width / 7;
    // set the width for columns
    const colStyle = {
      boxSizing: 'border-box',
      display: 'inline-block',
      padding: 10,
      position: 'relative',
      textAlign: 'center',
      width: colWidth,
    };

    // get date info
    const currentDate = moment().add(calendarMonthIndex, 'months');
    const year = currentDate.format('YYYY');
    const month = currentDate.format('MMMM');
    const week = this.genWeek();
    const today = moment().format('YYYY-MM-DD');
    const monthDates = this.genMonthDates(currentDate);

    return (
      <div
        className="Calendar"
        style={wrapperStyle}
      >

        <CalendarHeader
          color={color}
          lightHeader={lightHeader}
          month={month}
          moveIndex={moveIndex}
          year={year}
        />

        <DayHeader
          colStyle={colStyle}
          dayNames={dayNames}
          week={week}
        />

        <MonthDates
          color={color}
          colStyle={colStyle}
          currentDate={currentDate}
          endDate={endDate}
          handleDateChange={handleDateChange}
          hoverWeek={hoverWeek}
          lightHeader={lightHeader}
          monthDates={monthDates}
          range={range}
          selectedDate={selectedDate}
          today={today}
          year={year}
        />

      </div>
    );
  }
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

export default Calendar;

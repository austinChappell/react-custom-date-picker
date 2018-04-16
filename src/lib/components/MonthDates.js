import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from './Day';

const propTypes = {
  color: PropTypes.string.isRequired,
  colStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  currentDate: PropTypes.objectOf(PropTypes.any).isRequired,
  endDate: PropTypes.objectOf(PropTypes.any),
  handleDateChange: PropTypes.func.isRequired,
  hoverWeek: PropTypes.bool.isRequired,
  lightHeader: PropTypes.bool.isRequired,
  monthDates: PropTypes.arrayOf(PropTypes.array).isRequired,
  range: PropTypes.bool.isRequired,
  selectedDate: PropTypes.objectOf(PropTypes.any),
  today: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

const defaultProps = {
  selectedDate: null,
};

class MonthDates extends Component {
  state = {
    activeWeekIndex: null,
    activeDayIndex: null,
  }

  handleHover = (dayIndex, weekIndex) => {
    this.setState({
      activeDayIndex: dayIndex,
      activeWeekIndex: weekIndex,
    });
  }

  render() {
    const {
      color,
      colStyle,
      currentDate,
      endDate,
      handleDateChange,
      hoverWeek,
      lightHeader,
      monthDates,
      range,
      selectedDate,
      today,
      year,
    } = this.props;

    const {
      activeDayIndex,
      activeWeekIndex,
    } = this.state;

    return (
      <div
        className="calendar-dates"
        onMouseLeave={() => this.handleHover(null, null)}
        style={{
          cursor: 'pointer',
          fontWeight: 200,
        }}
      >
        {monthDates.map((weekOfMonth, weekIndex) => (
          <div
            key={weekIndex}
            className={hoverWeek ? 'calendar-week hover-week' : 'calendar-week'}
          >
            {weekOfMonth.map((day, dayIndex) => {
              let monthAsNum = currentDate.format('MM');
              let yearOfDay = year;

              const isCurrentMonth = day.month === 'current';
              const isPrevMonth = day.month === 'previous';
              const isNextMonth = day.month === 'next';

              if (monthAsNum === '01' && isPrevMonth) {
                yearOfDay = String(Number(year) - 1);
                monthAsNum = '12';
              } else if (monthAsNum === '12' && isNextMonth) {
                yearOfDay = String(Number(year) + 1);
                monthAsNum = '01';
              } else if (isPrevMonth) {
                monthAsNum = String(Number(monthAsNum) - 1).padStart(2, '0');
              } else if (isNextMonth) {
                monthAsNum = String(Number(monthAsNum) + 1).padStart(2, '0');
              }

              const dateDisplay = `${year}-${monthAsNum}-${day.date}`;
              const selectedDateDisplay = moment(selectedDate).format('YYYY-MM-DD');
              const endDateDisplay = moment(endDate).format('YYYY-MM-DD');
              const dateValid = JSON.stringify(new Date(dateDisplay)) !== 'null';

              const isSelected = dateDisplay === selectedDateDisplay && dateValid;
              const endDateSelected = dateDisplay === endDateDisplay && dateValid;
              const isToday = dateDisplay === today;
              const todayMarker = isToday ?
                (
                  <span
                    style={{
                      bottom: 0,
                      color,
                      position: 'absolute',
                      right: 0,
                    }}
                  >
                    &#9698;
                  </span>
                )
                : null;

              const additionalStyle = {};
              let secondaryHover = false;

              if (isSelected || endDateSelected) {
                additionalStyle.backgroundColor = color;
                additionalStyle.color = lightHeader ? 'white' : 'black';
              } else if (!isCurrentMonth) {
                additionalStyle.color = '#cccccc';
              }

              const dayStyle = Object.assign({}, colStyle, additionalStyle);
              const activeDay = dayIndex === activeDayIndex;
              const activeWeek = weekIndex === activeWeekIndex;
              const active = activeDay && activeWeek;

              if (range && selectedDate && !endDate) {
                const diff = moment(dateDisplay).diff(moment(selectedDate), 'days');
                const presentWeek = weekIndex === activeWeekIndex;
                const futureWeek = weekIndex < activeWeekIndex;
                const futureDay = dayIndex < activeDayIndex;
                const isFuture = (presentWeek && futureDay) || futureWeek;
                if (diff > 0 && isFuture) {
                  secondaryHover = true;
                }
              } else if (range && selectedDate && endDate) {
                const rangeDiff = moment(endDate).diff(moment(selectedDate), 'days');
                const diff = moment(dateDisplay).diff(moment(selectedDate), 'days');
                if (diff > 0 && diff < rangeDiff) {
                  secondaryHover = true;
                }
              } else if (activeWeek && hoverWeek) {
                secondaryHover = true;
              }

              return (
                <Day
                  key={dayIndex}
                  active={active}
                  day={day}
                  dayIndex={dayIndex}
                  dayStyle={dayStyle}
                  handleDateChange={handleDateChange}
                  handleHover={this.handleHover}
                  monthAsNum={monthAsNum}
                  secondaryHover={secondaryHover}
                  todayMarker={todayMarker}
                  weekIndex={weekIndex}
                  yearOfDay={yearOfDay}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

MonthDates.propTypes = propTypes;
MonthDates.defaultProps = defaultProps;

export default MonthDates;

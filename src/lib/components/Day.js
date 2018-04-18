import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  active: PropTypes.bool.isRequired,
  day: PropTypes.objectOf(PropTypes.any).isRequired,
  dayIndex: PropTypes.number.isRequired,
  dayStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleHover: PropTypes.func.isRequired,
  monthAsNum: PropTypes.string.isRequired,
  outsideOfRange: PropTypes.bool.isRequired,
  secondaryHover: PropTypes.bool.isRequired,
  todayMarker: PropTypes.objectOf(PropTypes.any),
  weekIndex: PropTypes.number.isRequired,
  yearOfDay: PropTypes.string.isRequired,
};

const defaultProps = {
  todayMarker: null,
};

const Day = (props) => {
  const {
    active,
    secondaryHover,
    day,
    dayIndex,
    dayStyle,
    handleDateChange,
    handleHover,
    monthAsNum,
    outsideOfRange,
    todayMarker,
    weekIndex,
    yearOfDay,
  } = props;

  const activeDayStyle = {
    backgroundColor: active ? '#cccccc' : '#ffffff',
  };

  const secondaryHoverStyle = {
    backgroundColor: secondaryHover ? '#dddddd' : '#ffffff',
  };

  const outsideRangeStyle = {
    color: '#dddddd',
  };

  let activeStyle;

  if (active) {
    activeStyle = activeDayStyle;
  } else if (secondaryHover) {
    activeStyle = secondaryHoverStyle;
  } else if (outsideOfRange) {
    activeStyle = outsideRangeStyle;
  } else {
    activeStyle = {};
  }

  const style = Object.assign({}, dayStyle, activeStyle);
  return (
    <span
      key={dayIndex}
      onClick={() => {
        return outsideOfRange ?
          () => {} :
          handleDateChange(yearOfDay, monthAsNum, day.date);
      }}
      onMouseEnter={() => {
        return outsideOfRange ?
          // disable previous allowed hover
          handleHover(null, null) :
          handleHover(dayIndex, weekIndex);
      }}
      style={style}
    >
      {day.date} {todayMarker}
    </span>
  );
};

Day.propTypes = propTypes;
Day.defaultProps = defaultProps;

export default Day;

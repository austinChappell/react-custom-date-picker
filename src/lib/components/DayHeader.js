import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  colStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  dayNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  week: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const DayHeader = ({ colStyle, dayNames, week }) => {
  const style = Object.assign({}, colStyle, { fontWeight: 600 });
  return (
    <div className="day-header">
      {week.map((dayIndex, index) => (
        <span
          key={index}
          style={style}
        >
          {dayNames[dayIndex]}
        </span>
      ))}
    </div>
  );
};

DayHeader.propTypes = propTypes;

export default DayHeader;

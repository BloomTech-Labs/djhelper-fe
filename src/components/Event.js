import React from 'react';

import formatDate from '../utils/formatDate';

const Event = props => {
  let eventClass;
  if (props.data.active === `event${props.num}`) {
    eventClass = 'selected';
  } else {
    eventClass = '';
  }

  const eventNum = `event${props.num}`;
  const event = props.data[eventNum];
  const formattedDate = formatDate(event.date);
  return (
    <button
      type="button"
      data-testid="event-component"
      className={`events ${eventClass}`}
      onClick={() =>
        props.setData({ ...props.data, active: `event${props.num}` })
      }
    >
      {event && <h2>{event.name}</h2>}
      {event && <p> Date: {formattedDate} </p>}
    </button>
  );
};

export default Event;

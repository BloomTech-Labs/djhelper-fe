import React, { useState, useEffect } from 'react';

const Event = props => {
  let eventClass;
  if (props.data.active === `event${props.num}`) {
    eventClass = 'selected';
  } else {
    eventClass = '';
  }

  let eventNum = `event${props.num}`;
  let event = props.data[eventNum];
  return (
    <button
      type="button"
      className={`events ${eventClass}`}
      onClick={() =>
        props.setData({ ...props.data, active: `event${props.num}` })
      }
    >
      {event && <h2>{event.name}</h2>}
      {event && <p> Date: {event.date}</p>}
    </button>
  );
};

export default Event;

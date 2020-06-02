import React from 'react';


import formatDate from '../utils/formatDate';

const Event = props => {
  console.log("propsEvent", props.history)
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
    
   
    <div
      
      data-testid="event-component"
      className={`eventCard ${eventClass}`}
      onClick={() =>
        props.setData({ ...props.data, active: `event${props.num}` })
      }
    >
      {event && <h2>{event.name}</h2>}
      {event && <p> Date: {formattedDate} </p>}
    </div>
    
   
  );
};

export default Event;

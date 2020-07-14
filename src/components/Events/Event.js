import React from 'react';

import formatDate from '../../utils/formatDate';
import event1 from "../../images/event1.png"
import event2 from "../../images/event2.png"
import event3 from "../../images/event3.png"
import event4 from "../../images/event4.png"
import event5 from "../../images/event5.png"
import event6 from "../../images/event6.png"

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
  const daysAway=Number(Date.now())-formattedDate
  const imageArray=[event1, event2, event3,event4,event5,event6]
  console.log("imageArray" ,imageArray)

  const randomImageGenerator=(imgAr)=>{
    
    let number= Math.floor(Math.random() * imageArray.length)
    let image=imgAr[number]

    return image;
  
  }

  
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
      {event && <p> Days away {daysAway} </p>}
      {event && <img src ={randomImageGenerator(imageArray)} alt ="eventImages"/>}
    </div>
  );
};

export default Event;

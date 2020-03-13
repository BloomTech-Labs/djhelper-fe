import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const EditEvent = props => {
  // TODO: Get event data from back end, once it is available (instead of redux store)
  const events = useSelector(state => state.userReducer.events);
  const [currentEvent] = useState(events[`event${props.event_id}`]);

  const handleSubmit = () => {
    props.setIsEditing(!props.isEditing);
  };
  return (
    <div>
      <h3 className="bold">{currentEvent.name}</h3>
      <p>
        <b className="bold">Event Type:</b> {currentEvent.event_type}
      </p>
      <p>
        <b className="bold">Date: </b>
        {currentEvent.date}
      </p>
      <p className="bold">Description:</p>
      <p>{currentEvent.description}</p>
      <button type="button" onClick={handleSubmit}>
        Submit Changes
      </button>
    </div>
  );
};

export default EditEvent;

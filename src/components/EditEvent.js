import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const EditEvent = props => {
  // TODO: Get event data from back end, once it is available (instead of redux store)
  const events = useSelector(state => state.userReducer.events);
  const [currentEvent, setCurrentEvent] = useState(
    events[`event${props.event_id}`]
  );

  const handleSubmit = e => {
    e.preventDefault();
    props.setIsEditing(!props.isEditing);
  };

  const handleChanges = e => {
    setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="name"
          type="text"
          id="name"
          name="name"
          onChange={handleChanges}
          value={currentEvent.name}
        />
        <p>
          <b className="bold">Event Type:</b> {currentEvent.event_type}
        </p>
        <p>
          <b className="bold">Date: </b>
          {currentEvent.date}
        </p>
        <p className="bold">Description:</p>
        <p>{currentEvent.description}</p>
        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
};

export default EditEvent;

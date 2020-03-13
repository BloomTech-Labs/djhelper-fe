import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editEvent } from '../actions/action';

const EditEvent = props => {
  // TODO: Get event data from back end, once it is available (instead of redux store)
  const events = useSelector(state => state.userReducer.events);
  const [currentEvent, setCurrentEvent] = useState(
    events[`event${props.event_id}`]
  );
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    props.setIsEditing(!props.isEditing);
    dispatch(editEvent(currentEvent));
  };

  const handleChanges = e => {
    setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
  };

  return (
    <div className="edit-event-form">
      <form onSubmit={handleSubmit}>
        <input
          className="name"
          type="text"
          id="name"
          name="name"
          onChange={handleChanges}
          value={currentEvent.name}
        />
        <div className="input-group">
          <label htmlFor="event_type">Event Type:</label>
          <input
            type="text"
            id="event_type"
            name="event_type"
            onChange={handleChanges}
            value={currentEvent.event_type}
          />
        </div>
        <div className="input-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleChanges}
            value={currentEvent.date}
          />
        </div>
        <div className="input-group description">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            onChange={handleChanges}
            value={currentEvent.description}
          />
        </div>
        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
};

export default EditEvent;

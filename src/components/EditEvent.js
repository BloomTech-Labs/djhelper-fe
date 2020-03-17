import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { editEvent, deleteEvent, getLocation } from '../actions/action';

const EditEvent = props => {
  // TODO: Get event data from back end, once it is available (instead of redux store)
  const events = useSelector(state => state.userReducer.events);
  const locations = useSelector(state => state.userReducer.locations);
  const editEventStart = useSelector(state => state.userReducer.editEventStart);
  const [currentEvent, setCurrentEvent] = useState(
    events[`event${props.event_id}`]
  );
  console.log("CurrentEvent's location id: ", currentEvent.location_id);

  useEffect(() => {
    dispatch(getLocation(currentEvent.location_id));
  }, []);

  const [toggleDelete, setToggleDelete] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    props.setIsEditing(!props.isEditing);
    const eventToSend = {
      name: currentEvent.name,
      event_type: currentEvent.event_type,
      description: currentEvent.description,
      date: currentEvent.date,
      start_time: currentEvent.start_time,
      end_time: currentEvent.end_time
    };
    console.log('currentEvent ready to send: ', eventToSend);
    dispatch(editEvent(eventToSend, props.event_id));
  };

  const handleChanges = e => {
    setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
  };

  const handleDeleteToggle = () => {
    setToggleDelete(!toggleDelete);
  };

  const handleDelete = () => {
    dispatch(deleteEvent(currentEvent, props.history));
  };

  return (
    <div className="edit-event-form">
      {editEventStart && (
        <div className="loader">
          <Loader type="Audio" color="purple" height={200} width={200} />
        </div>
      )}
      {!editEventStart && (
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
          <button type="submit" data-testid="submit-button">
            Submit Changes
          </button>
          {!toggleDelete && (
            <button
              type="button"
              onClick={handleDeleteToggle}
              className="toggle-delete"
            >
              Delete Event
            </button>
          )}
          {toggleDelete && (
            <>
              <p>Are you 100% sure that you want to delete this event?</p>
              <button
                type="button"
                className="toggle-delete"
                onClick={handleDelete}
              >
                Yes, delete this event.
              </button>
              <button
                type="button"
                className="cancel-delete"
                onClick={handleDeleteToggle}
              >
                No, go ahead and keep this event.
              </button>
            </>
          )}
          <button type="button">Edit Location Info</button>
        </form>
      )}
    </div>
  );
};

export default EditEvent;

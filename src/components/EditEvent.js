import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import {
  editEvent,
  deleteEvent,
  getLocation,
  editLocation
} from '../actions/action';

const EditEvent = props => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.userReducer.events);
  const [currentEvent, setCurrentEvent] = useState(
    events[`event${props.event_id}`]
  );

  // Event Editing

  const editEventStart = useSelector(state => state.userReducer.editEventStart);

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
    dispatch(editEvent(eventToSend, props.event_id));
  };

  const handleChanges = e => {
    setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
  };

  // Event Deletion

  const [toggleDelete, setToggleDelete] = useState(false);

  const handleDeleteToggle = () => {
    setToggleDelete(!toggleDelete);
  };

  const handleDelete = () => {
    dispatch(deleteEvent(currentEvent, props.history));
  };

  // Location Editing

  const locations = useSelector(state => state.userReducer.locations);
  const [currentLocation, setCurrentLocation] = useState();
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    dispatch(getLocation(currentEvent.location_id));
  }, []);

  useEffect(() => {
    setCurrentLocation(
      locations.filter(location => location.id === currentEvent.location_id)[0]
    );
  }, [locations]);

  const toggleLocationDisplay = () => {
    setShowLocation(!showLocation);
    console.log('currentLocation: ', currentLocation);
  };
  const handleLocationChanges = e => {
    setCurrentLocation({ ...currentLocation, [e.target.name]: e.target.value });
  };
  const handleLocationEdit = e => {
    e.preventDefault();
    console.log('currentLocation to submit: ', currentLocation);
    dispatch(editLocation(currentEvent.location_id, currentLocation));
    toggleLocationDisplay();
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
          <button type="button" onClick={toggleLocationDisplay}>
            {!showLocation ? 'Edit Location Info' : 'Hide Location Info'}
          </button>
          {showLocation && (
            <>
              <div className="input-group">
                <label htmlFor="address_line_1">Address Line 1:</label>
                <input
                  name="address_line_1"
                  id="address_line_1"
                  value={currentLocation.address_line_1}
                  onChange={handleLocationChanges}
                />
              </div>
              <div className="input-group">
                <label htmlFor="address_line_2">Address Line 2:</label>
                <input
                  name="address_line_2"
                  id="address_line_2"
                  value={currentLocation.address_line_2}
                  onChange={handleLocationChanges}
                />
              </div>
              <div className="input-group">
                <label htmlFor="city">City:</label>
                <input
                  name="city"
                  id="city"
                  value={currentLocation.city}
                  onChange={handleLocationChanges}
                />
              </div>
              <div className="input-group">
                <label htmlFor="state">State:</label>
                <input
                  name="state"
                  id="state"
                  value={currentLocation.state}
                  onChange={handleLocationChanges}
                />
              </div>
              <div className="input-group">
                <label htmlFor="zip">Zip:</label>
                <input
                  name="zip"
                  id="zip"
                  value={currentLocation.zip}
                  onChange={handleLocationChanges}
                />
              </div>
              <button type="button" onClick={handleLocationEdit}>
                Submit Location Changes
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default EditEvent;

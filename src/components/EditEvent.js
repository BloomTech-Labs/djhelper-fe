import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import {
  editEvent,
  deleteEvent,
  getLocation,
  editLocation
} from '../actions/eventActions';
import formatDateForInput from '../utils/formatDateForInput';

const EditEvent = props => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.userReducer.events);
  const [currentEvent, setCurrentEvent] = useState(
    events[`event${props.event_id}`]
  );

  useEffect(() => {
    const formattedDate = formatDateForInput(currentEvent.date);
    setCurrentEvent({ ...currentEvent, date: formattedDate });
  }, [events]);

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
      end_time: currentEvent.end_time,
      img_url: currentEvent.img_url
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
  const [showVenue, setShowVenue] = useState(false);

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
    const locationToSubmit = {
      address_line_1: currentLocation.address_line_1,
      address_line_2: currentLocation.address_line_2,
      city: currentLocation.city,
      state: currentLocation.state,
      zip: currentLocation.zip,
      name: currentLocation.venue_name,
      phone: currentLocation.phone,
      website: currentLocation.website,
      email: currentLocation.email,
      img_url: currentLocation.venue_img_url
    };
    console.log('currentLocation to submit: ', locationToSubmit);
    dispatch(editLocation(currentEvent.location_id, locationToSubmit));
    setShowLocation(false);
    setShowVenue(false);
  };

  // Venue Editing

  const toggleVenueDisplay = () => {
    setShowVenue(!showVenue);
    setCurrentLocation({
      ...currentLocation,
      venue_name: currentLocation.name,
      venue_img_url: currentLocation.img_url
    });
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
          {!showLocation && !showVenue && (
            <>
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
              <div className="time-group">
                <div className="input-group">
                  <label htmlFor="start_time">Start Time:</label>
                  <input
                    type="time"
                    id="start_time"
                    name="start_time"
                    onChange={handleChanges}
                    value={currentEvent.start_time}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="end_time">End Time:</label>
                  <input
                    type="time"
                    id="end_time"
                    name="end_time"
                    onChange={handleChanges}
                    value={currentEvent.end_time}
                  />
                </div>
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
              <div className="input-group">
                <label htmlFor="img_url">Image Url: </label>
                <input
                  type="url"
                  name="img_url"
                  id="img_url"
                  onChange={handleChanges}
                  value={currentEvent.img_url}
                />
              </div>
              <button type="submit" data-testid="submit-button">
                Submit Changes
              </button>
            </>
          )}

          {showLocation && (
            <>
              <div className="input-group">
                <label htmlFor="address_line_1">Address Line 1:</label>
                <input
                  name="address_line_1"
                  id="address_line_1"
                  type="text"
                  value={currentLocation.address_line_1}
                  onChange={handleLocationChanges}
                />
              </div>
              <div className="input-group">
                <label htmlFor="address_line_2">Address Line 2:</label>
                <input
                  name="address_line_2"
                  id="address_line_2"
                  type="text"
                  value={currentLocation.address_line_2}
                  onChange={handleLocationChanges}
                />
              </div>
              <div className="input-group">
                <label htmlFor="city">City:</label>
                <input
                  name="city"
                  id="city"
                  type="text"
                  value={currentLocation.city}
                  onChange={handleLocationChanges}
                />
              </div>
              <div className="time-group">
                <div className="input-group">
                  <label htmlFor="state">State:</label>
                  <input
                    name="state"
                    id="state"
                    type="text"
                    value={currentLocation.state}
                    onChange={handleLocationChanges}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="zip">Zip:</label>
                  <input
                    name="zip"
                    type="text"
                    id="zip"
                    value={currentLocation.zip}
                    onChange={handleLocationChanges}
                  />
                </div>
              </div>
              <button type="button" onClick={handleLocationEdit}>
                Submit Location Changes
              </button>
            </>
          )}

          {!showVenue && (
            <button type="button" onClick={toggleLocationDisplay}>
              {!showLocation ? 'Edit Location Info' : 'Cancel Edit Location'}
            </button>
          )}

          {showVenue && (
            <>
              <div className="input-group">
                <label htmlFor="venue_name">Venue Name:</label>
                <input
                  name="venue_name"
                  id="venue_name"
                  type="text"
                  value={currentLocation.venue_name}
                  onChange={handleLocationChanges}
                />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  name="phone"
                  id="phone"
                  type="tel"
                  value={currentLocation.phone}
                  onChange={handleLocationChanges}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={currentLocation.email}
                  onChange={handleLocationChanges}
                />
              </div>
              <div>
                <label htmlFor="website">Website:</label>
                <input
                  name="website"
                  id="website"
                  type="url"
                  value={currentLocation.website}
                  onChange={handleLocationChanges}
                />
              </div>
              <div className="input-group">
                <label htmlFor="venue_img_url">Venue Image Url: </label>
                <input
                  type="url"
                  name="venue_img_url"
                  id="venue_img_url"
                  onChange={handleLocationChanges}
                  value={currentEvent.venue_img_url}
                />
              </div>

              <button type="button" onClick={handleLocationEdit}>
                Submit Venue Info Changes
              </button>
            </>
          )}

          {!showLocation && (
            <button type="button" onClick={toggleVenueDisplay}>
              {!showVenue ? 'Edit Venue Info' : 'Cancel Edit Venue'}
            </button>
          )}

          {!toggleDelete && !showLocation && !showVenue && (
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
        </form>
      )}
    </div>
  );
};

export default EditEvent;

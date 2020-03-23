import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavigationBar from './NavigationBar';

import djTurntable from '../images/djTurntable-min.jpg';
import stage from '../images/stage-min.jpg';
import { validUrl } from '../utils/validUrl';
import { addEvent } from '../actions/action';

const AddEvent = props => {
  const id = useSelector(state => state.userReducer.id);
  const [eventData, setEventData] = useState({
    dj_id: id,
    name: '',
    date: '',
    start_time: '',
    end_time: '',
    event_type: '',
    description: '',
    img_url: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    playlist_id: '',
    request_list_id: '',
    location_name: '',
    phone: '',
    website: '',
    email: '',
    location_img_url: ''
  });

  const [changeEventImage, setChangeEventImage] = useState(false);
  const [changeLocationImage, setChangeLocationImage] = useState(false);
  const [showMoreLocationData, setShowMoreLocationData] = useState(false);

  const EventPic = useRef();
  const LocationPic = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (validUrl(eventData.img_url)) {
      EventPic.current.src = eventData.img_url;
    }
  }, [eventData.img_url]);

  useEffect(() => {
    if (validUrl(eventData.location_img_url)) {
      LocationPic.current.src = eventData.location_img_url;
    }
  }, [eventData.location_img_url]);

  const handleInputChange = e => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('event to submit: ', eventData);
    dispatch(addEvent(eventData, props.history));
  };

  const handleVenueInfo = () => {
    setShowMoreLocationData(!showMoreLocationData);
  };

  const handleEventImageChange = () => {
    setChangeEventImage(!changeEventImage);
  };

  const handleLocationImageChange = () => {
    setChangeLocationImage(!changeLocationImage);
  };

  return (
    <div className="add-event">
      <NavigationBar />
      <div className="add-event-title">
        <h1>Add an Event</h1>
      </div>
      <div className="main-form">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="img-container" data-testid="event-img-container">
              <span
                className="pencil"
                onClick={handleEventImageChange}
                data-testid="event-pencil"
              >
                <FontAwesomeIcon icon="pencil-alt" size="2x" />
              </span>
              <img src={djTurntable} ref={EventPic} alt="event" />
            </div>

            {changeEventImage && (
              <div className="input-group">
                <label htmlFor="img_url">Link to Event Image: </label>
                <input
                  type="url"
                  name="img_url"
                  id="img_url"
                  onChange={handleInputChange}
                  value={eventData.img_url}
                />
              </div>
            )}
          </div>

          <div className="form-section">
            <h2>What: </h2>
            <div className="input-group">
              <label htmlFor="name">Event Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
                value={eventData.name}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="event_type">Type of Event: </label>
              <input
                type="text"
                name="event_type"
                id="event_type"
                onChange={handleInputChange}
                value={eventData.event_type}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="description">Description: </label>
              <textarea
                type="text"
                name="description"
                id="description"
                onChange={handleInputChange}
                value={eventData.description}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Where: </h2>
            <div className="input-group">
              <label htmlFor="address_line_1">Address Line 1: </label>
              <input
                type="text"
                name="address_line_1"
                id="address_line_1"
                onChange={handleInputChange}
                value={eventData.address_line_1}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="address-line-2">Address Line 2: </label>
              <input
                type="text"
                name="address_line_2"
                id="address_line_2"
                onChange={handleInputChange}
                value={eventData.address_line_2}
              />
            </div>
            <div className="last-line-address">
              <div className="input-group city">
                <label htmlFor="city">City: </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={handleInputChange}
                  value={eventData.city}
                  required
                />
              </div>

              <div className="input-group state">
                <label htmlFor="state">State: </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  onChange={handleInputChange}
                  value={eventData.state}
                  required
                />
              </div>

              <div className="input-group zip">
                <label htmlFor="zip">Zip: </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  onChange={handleInputChange}
                  value={eventData.zip}
                  required
                />
              </div>
            </div>

            {showMoreLocationData && (
              <div className="venue-info-title">
                <h2>Venue Info: </h2>
              </div>
            )}
            {showMoreLocationData && (
              <div className="input-group">
                <label htmlFor="location_name">Venue Name: </label>
                <input
                  type="text"
                  name="location_name"
                  id="location_name"
                  onChange={handleInputChange}
                  value={eventData.location_name}
                />
              </div>
            )}

            {showMoreLocationData && (
              <div className="input-group">
                <label htmlFor="website">Venue Website: </label>
                <input
                  type="url"
                  name="website"
                  id="website"
                  onChange={handleInputChange}
                  value={eventData.website}
                />
              </div>
            )}

            {showMoreLocationData && (
              <div className="input-group">
                <label htmlFor="phone">Venue Phone: </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  onChange={handleInputChange}
                  value={eventData.phone}
                />
              </div>
            )}

            {showMoreLocationData && (
              <div className="input-group">
                <label htmlFor="email">Venue Email: </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                  value={eventData.email}
                />
              </div>
            )}

            {showMoreLocationData && changeLocationImage && (
              <div className="input-group">
                <label htmlFor="location_img_url">Link to Venue Image:</label>
                <input
                  type="url"
                  name="location_img_url"
                  id="location_img_url"
                  onChange={handleInputChange}
                  value={eventData.location_img_url}
                />
              </div>
            )}
            <button
              type="button"
              onClick={handleVenueInfo}
              className="more"
              data-testid="showMoreLocationData"
            >
              {!showMoreLocationData
                ? 'Show More Venue Info'
                : 'Hide More Venue Info'}
            </button>
          </div>

          <div className="form-section">
            <h2>When: </h2>
            <div className="when-inputs">
              <div className="input-group date">
                <label htmlFor="date">Date: </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={handleInputChange}
                  value={eventData.date}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="start_time">Start Time: </label>
                <input
                  type="time"
                  name="start_time"
                  id="start_time"
                  value={eventData.start_time}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="end_time">End Time: </label>
                <input
                  type="time"
                  name="end_time"
                  id="end_time"
                  value={eventData.end_time}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {showMoreLocationData && (
              <div
                className="img-container"
                data-testid="location-img-container"
              >
                <span
                  className="pencil"
                  onClick={handleLocationImageChange}
                  data-testid="location-pencil"
                >
                  <FontAwesomeIcon icon="pencil-alt" size="2x" />
                </span>
                <img src={stage} alt="sample stage" ref={LocationPic} />
              </div>
            )}
            <button type="submit" data-testid="submit-button">
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;

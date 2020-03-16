import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDJ } from '../actions/action';

import { locations } from '../data/locations';
import formatDate from '../utils/formatDate';
import formatTime from '../utils/formatTime';
import useWindowSize from '../utils/useWindowSize';

const EventGuestView = props => {
  const dispatch = useDispatch();
  const [formattedDate, setFormattedDate] = useState(null);
  const [formattedStartTime, setFormattedStartTime] = useState(null);
  const [formattedEndTime, setFormattedEndTime] = useState(null);

  const { dj_id, event_id } = props.match.params;

  const name = useSelector(state => state.userReducer.name);
  const email = useSelector(state => state.userReducer.email);
  const phone = useSelector(state => state.userReducer.phone);
  const website = useSelector(state => state.userReducer.website);
  const bio = useSelector(state => state.userReducer.bio);
  const profile_pic_url = useSelector(
    state => state.userReducer.profile_pic_url
  );

  // TODO: Get event data from back end, once it is available (instead of redux store)
  const events = useSelector(state => state.userReducer.events);
  const [currentEvent] = useState(events[`event${event_id}`]);

  // TODO: Get location data from back end, once it is available (instead of dummy data)
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (currentEvent) {
      setLocation(
        locations.find(item => item.location_id === currentEvent.location_id)
      );
    }
  }, [currentEvent]);

  useEffect(() => {
    dispatch(getDJ(dj_id));
  }, [dispatch, dj_id]);

  useEffect(() => {
    setFormattedDate(formatDate(currentEvent.date));
  }, [currentEvent.date]);

  useEffect(() => {
    if (currentEvent.start_time) {
      setFormattedStartTime(formatTime(currentEvent.start_time));
    }
  }, [currentEvent.start_time]);

  useEffect(() => {
    if (currentEvent.end_time) {
      setFormattedEndTime(formatTime(currentEvent.end_time));
    }
  }, [currentEvent.end_time]);

  const [mobileView, setMobileView] = useState(false);
  const [width] = useWindowSize();

  const toggleMobileView = () => {
    if (width < 500) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  useEffect(() => {
    toggleMobileView();
  }, [width]);

  const handleAddRequest = () => {
    alert(
      'We are excited that you want to add song requests. This feature is coming soon!'
    );
  };

  return (
    <div className="event-guest-view-page">
      <div className="section left-side" id="info">
        {!currentEvent && (
          <h2>
            Sorry, this event page is not for a valid event. Please check to see
            if your url is correct.
          </h2>
        )}
        {currentEvent && (
          <div>
            <h1 className="main-title">{currentEvent.name}</h1>
            {mobileView && (
              <nav>
                <a href="#request-list">Requests</a>
                <a href="#playlist">Playlist</a>
              </nav>
            )}
            {formattedDate && <h2>{formattedDate}</h2>}
            <p>
              {formattedStartTime && formattedStartTime}
              {formattedStartTime && ' - '}
              {formattedEndTime && formattedEndTime}
            </p>
            <p>{currentEvent.description}</p>
            {currentEvent.img_url && (
              <div className="img-container">
                <img src={currentEvent.img_url} alt={currentEvent.name} />
              </div>
            )}
          </div>
        )}

        {currentEvent && location && (
          <div>
            <h2>Venue:</h2>
            <h3>{location.name}</h3>
            <p>{location.address_line_1}</p>
            <p>{location.address_line_2}</p>
            <p>
              {location.city}, {location.state} {location.zip}
            </p>
            <p>
              <a href={`tel:${location.phone}`}>{location.phone}</a>
            </p>
            <p>
              <a href={`mailto:${location.email}`}>{location.email}</a>
            </p>
            <p>
              <a
                href={location.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {location.website}
              </a>
            </p>
            {location.img_url && (
              <div className="img-container">
                <img src={location.img_url} alt={location.name} />
              </div>
            )}
          </div>
        )}
        {name && (
          <div>
            <h2>Your DJ:</h2>
            <h3>{name}</h3>
            <p>{bio}</p>
            <p>
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
            <p>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
            <p>
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
            </p>
            {profile_pic_url && (
              <div className="img-container">
                <img src={profile_pic_url} alt={name} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="section middle" id="request-list">
        <h2>Request List</h2>
        <button type="button" onClick={handleAddRequest}>
          Add a Song Request
        </button>
      </div>
      <div className="section right-side" id="playlist">
        <h2>Playlist</h2>
      </div>
    </div>
  );
};

export default EventGuestView;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDJ } from '../actions/action';

import { locations } from '../data/locations';

const EventGuestView = props => {
  const dispatch = useDispatch();
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

  const location = locations.find(
    item => item.location_id === currentEvent.location_id
  );

  useEffect(() => {
    dispatch(getDJ(dj_id));
  }, []);

  const dtf = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });

  const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
    new Date(currentEvent.date)
  );
  const formattedDate = `${da} ${mo} ${ye}`;

  return (
    <div className="event-guest-view-page">
      <div className="section left-side">
        {currentEvent && (
          <div>
            <h1 className="main-title">{currentEvent.name}</h1>
            <h2>{formattedDate}</h2>
            <p>
              {currentEvent.start_time} - {currentEvent.end_time}
            </p>
            <p>Event Type: {currentEvent.event_type}</p>
            <p>{currentEvent.description}</p>
          </div>
        )}

        {currentEvent && (
          <div>
            <h2>Venue</h2>
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
              <a href={location.website}>{location.website}</a>
            </p>
            <div className="img-container">
              <img src={location.img_url} alt={location.name} />
            </div>
          </div>
        )}
        {name && (
          <div>
            <h2>About Your DJ</h2>
            <h3>{name}</h3>
            <p>{bio}</p>
            <p>
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
            <p>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
            <p>
              <a href={website}>{website}</a>
            </p>
            <div className="img-container">
              <img src={profile_pic_url} alt={name} />
            </div>
          </div>
        )}
      </div>

      <div className="section middle">
        <h2>Request List</h2>
      </div>
      <div className="section right-side">
        <h2>Playlist</h2>
      </div>
    </div>
  );
};

export default EventGuestView;

/*
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
    location_id: '',
    location_name: '',
    phone: '',
    website: '',
    email: '',
    location_img_url: ''
*/

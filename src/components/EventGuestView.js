import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { getDJ, getPlaylist } from '../actions/action';
import { getEvent, getLocation } from '../actions/eventActions';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {
  axiosWithAuthSpotifySearch,
  axiosWithAuthSpotify
} from '../utils/axiosWithAuthSpotify';
import formatDate from '../utils/formatDate';
import formatTime from '../utils/formatTime';
import useWindowSize from '../utils/useWindowSize';
import Songs from './Songs';

const EventGuestView2 = props => {
  const { dj_id, event_id, location_id } = props.match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDJ(dj_id));
    dispatch(getEvent(event_id));
    dispatch(getPlaylist(event_id));
    dispatch(getLocation(location_id));
  }, []);

  const name = useSelector(state => state.userReducer.name);
  const email = useSelector(state => state.userReducer.email);
  const phone = useSelector(state => state.userReducer.phone);
  const website = useSelector(state => state.userReducer.website);
  const bio = useSelector(state => state.userReducer.bio);
  const profile_pic_url = useSelector(
    state => state.userReducer.profile_pic_url
  );
  const event = useSelector(
    state => state.userReducer.events[`event${event_id}`]
  );

  const location = useSelector(state =>
    state.userReducer.locations.filter(
      item => Number(item.id) === Number(location_id)
    )
  )[0];

  const [eventPlaylist, setEventPlaylist] = useState(null);
  const [timeToDisplay, setTimeToDisplay] = useState(false);

  // Getting the playlist with using the redux store has been problematic here.
  // Ideally, we would use the code below, but oh well:
  // const eventPlaylist = useSelector(
  //  state => state.songReducer.eventPlaylists[`event${event_id}`].playlist
  // );
  // Maybe because it takes a while to get all the data from Spotify??
  // Meanwhile, a setTimeout plus a useEffect is doing the trick to display the playlist.

  setTimeout(function() {
    setTimeToDisplay(true);
  }, 2000);

  useEffect(() => {
    axiosWithAuth()
      .get(`/playlist/${event_id}`)
      .then(response => {
        const playlist = [];
        response.data.forEach(item => {
          // GET https://api.dj-helper.com/api/song/:song_id
          axiosWithAuth()
            .get(`/song/${item.song_id}`)
            .then(res => {
              axiosWithAuthSpotifySearch()
                .get(`/tracks/${res.data.spotify_id}`)
                .then(res2 => {
                  res2.data.queue_num = item.queue_num;
                  res2.data.connections_id = item.id;
                  playlist.push(res2.data);
                })
                .catch(err2 => {
                  console.log(err2);
                });
            })
            .catch(err => {
              console.log(err);
            });
        }); // ends forEach
        setEventPlaylist(playlist);
      })
      .catch(err3 => {
        console.log(err3);
      });
  }, []);

  // Spotify info access

  useEffect(() => {
    // If a guest comes to this page without logging in as a DJ first,
    // they need to get a Spotify access token to see the songs' components.
    // This will get the token and put it in localStorage.
    if (!localStorage.getItem('spotifyAccessToken')) {
      // Getting client id, secret, and grant type into correct format
      const data = new URLSearchParams({
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        grant_type: 'client_credentials'
      });
      // Getting an access token for the spotify API
      axiosWithAuthSpotify()
        .post('/api/token', data)
        .then(response => {
          localStorage.setItem(
            'spotifyAccessToken',
            response.data.access_token
          );
        })
        .catch(err => {
          // handle error
        });
    }
  }, []);

  // Adds nav if mobile display

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

  // Make the handleAddRequest functional once things are set up to do so
  const handleAddRequest = () => {
    alert(
      'We are excited that you want to add song requests. This feature is coming soon!'
    );
  };

  return (
    <div className="event-guest-view-page">
      <div className="section left-side" id="info">
        <div>
          {event && <h1 className="main-title">{event.name}</h1>}
          {mobileView && (
            <nav>
              <a href="#request-list">Requests</a>
              <a href="#playlist">Playlist</a>
            </nav>
          )}
          {event && <h2>{formatDate(event.date)}</h2>}
          {event && (
            <p>
              {event.start_time && formatTime(event.start_time)}
              {event.start_time && ' - '}
              {event.end_time && formatTime(event.end_time)}
            </p>
          )}
          {event && event.description && <p>{event.description}</p>}
          {event && event.img_url && (
            <div className="img-container">
              <img src={event.img_url} alt={event.name} />
            </div>
          )}
        </div>

        {location && (
          <div>
            <h2>Venue:</h2>
            {location.address_line_1 && <p>{location.address_line_1}</p>}
            {location.address_line_2 && <p>{location.address_line_2}</p>}
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
        <div className="playlist">
          {!timeToDisplay && (
            <div className="loader">
              <Loader type="Audio" color="purple" height={200} width={100} />
            </div>
          )}
          {timeToDisplay &&
            eventPlaylist.map(element => (
              <Songs items={element} playlist key={element.name} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventGuestView2;

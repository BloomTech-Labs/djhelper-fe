import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavigationBar from './NavigationBar';
import Songs from './Songs';
import SongSearch from './SongSearch';

import formatDate from '../utils/formatDate';

import EditEvent from './EditEvent';
import { searchForTrack } from '../actions/action';

const EventPage = props => {
  const dj_id = useSelector(state => state.userReducer.id);
  const FRONTEND_HOST =
    process.env.REACT_APP_FRONTEND_HOST || 'https://dj-helper.com/';

  const [qrCode, setQrCode] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);

  const { event_id } = props.location.state.event;

  const [isEditing, setIsEditing] = useState(false);

  const events = useSelector(state => state.userReducer.events);
  const [currentEvent, setCurrentEvent] = useState(events[`event${event_id}`]);

  const formattedDate = formatDate(currentEvent.date);

  useEffect(() => {
    setCurrentEvent(events[`event${event_id}`]);
  }, [events]);

  const eventPlaylist = useSelector(
    state => state.songReducer.eventPlaylists[`event${event_id}`].playlist
  );

  eventPlaylist.sort((a, b) => b.votes - a.votes);
  const [switches, setSwitches] = useState({
    buttonText: 'Add Songs',
    searchVisible: false,
    requestButtonStyle: 'active',
    playlistButtonStyle: 'show',
    addSongsButtonStyle: 'hide',
    playlistView: 'show',
    requestView: 'show',
    editModeOn: false,
    editButtonText: 'Edit Playlist'
  });
  const {
    requestButtonStyle,
    playlistButtonStyle,
    addSongsButtonStyle,
    playlistView,
    requestView,
    playlistClass,
    editModeOn,
    editButtonText
  } = switches;

  const setAppSize = () => {
    if (window.innerWidth < 500) {
      setSwitches({ ...switches, playlistView: 'hide' });
    } else {
      setSwitches({ ...switches, playlistView: 'show' });
    }
  };
  useEffect(() => {
    setAppSize();
  }, []);

  const dispatch = useDispatch();
  const handleClick = () => {
    let text;
    if (switches.buttonText === 'Add Songs') {
      text = 'Close Search';
    } else {
      text = 'Add Songs';
      dispatch(searchForTrack(''));
    }
    setSwitches({
      ...switches,
      buttonText: text,
      searchVisible: !switches.searchVisible
    });
  };
  const handleEditClick = () => {
    let text;
    if (switches.editButtonText === 'Edit Playlist') {
      text = 'Exit Edit Mode';
    } else {
      text = 'Edit Playlist';
    }
    setSwitches({
      ...switches,
      editButtonText: text,
      editModeOn: !switches.editModeOn
    });
  };

  const switchToRequests = () => {
    setSwitches({
      ...switches,
      requestButtonStyle: 'active',
      playlistButtonStyle: 'show',
      addSongsButtonStyle: 'hide',
      playlistView: 'hide',
      requestView: 'show'
    });
  };

  const switchToPlaylist = () => {
    setSwitches({
      ...switches,
      requestButtonStyle: 'show',
      playlistButtonStyle: 'active',
      addSongsButtonStyle: 'show',
      playlistView: 'show',
      requestView: 'hide'
    });
  };

  const searchVsPlaylist = () => {
    if (switches.searchVisible) {
      return (
        <div className="playlist">
          <SongSearch />
        </div>
      );
    }
  };
  const handleQRDisplay = () => {
    if (!qrCode) {
      const eventPage = `${FRONTEND_HOST}dj/${dj_id}/event/${event_id}`;
      const qrLink = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${eventPage}`;
      console.log(qrLink);
      setQrCode(qrLink);
    }
    setShowQrCode(!showQrCode);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="event-page">
      <NavigationBar tokenPresent={props.location.state.tokenPresent} />
      <div className="event-details">
        <div className="event-description">
          {isEditing && (
            <EditEvent
              event_id={event_id}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              history={props.history}
            />
          )}
          {!isEditing && (
            <>
              <h3 className="bold">{currentEvent.name}</h3>
              <p>
                <b className="bold">Event Type:</b> {currentEvent.event_type}
              </p>
              <p>
                <b className="bold">Date: </b>
                {formattedDate}
              </p>
              <p className="bold">Description:</p>
              <p>{currentEvent.description}</p>
              <p>
                <b className="bold">Sharable Event Page:</b>{' '}
                <Link to={`/dj/${dj_id}/event/${event_id}`}>
                  {`${FRONTEND_HOST}dj/${dj_id}/event/${event_id}`}
                </Link>
              </p>
              <button
                className="black-button"
                type="button"
                onClick={handleEdit}
              >
                {' '}
                Edit{' '}
              </button>

              <button
                type="button"
                className="black-button to-sharable"
                onClick={handleQRDisplay}
              >
                {!showQrCode ? 'Display QR Code' : 'Hide QR Code'}
              </button>

              {qrCode && showQrCode && (
                <div className="qr-code">
                  <img src={qrCode} alt="qr code" />
                </div>
              )}
            </>
          )}
          <h3 id="request-header-text-styling"> Requests </h3>

          <div className="mobile">
            <div className="mobile-switch-buttons">
              <button
                className={`playlist-buttons ${requestButtonStyle}`}
                onClick={() => switchToRequests()}
              >
                Requests
              </button>
              <button
                className={`playlist-buttons ${playlistButtonStyle}`}
                onClick={() => switchToPlaylist()}
              >
                Playlist
              </button>
            </div>
            <button
              className={`bold mobile-add-button ${addSongsButtonStyle}`}
              onClick={() => handleClick()}
            >
              {switches.buttonText}
            </button>
          </div>
          <div id="requests" className={`playlist ${requestView}`}>
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
          </div>
        </div>
        <div className={`event-playlist-location ${playlistView}`}>
          <div className="label">
            <p className="bold text-buttons" onClick={() => handleEditClick()}>
              {editButtonText}{' '}
            </p>
            <p className="bold text-buttons" onClick={handleClick}>
              {switches.buttonText}
            </p>
          </div>
          {searchVsPlaylist()}

          <h5> Playlist </h5>
          <div className="playlist">
            {eventPlaylist.map(element => (
              <Songs
                items={element}
                playlist
                editModeOn={editModeOn}
                key={`songID${element.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;

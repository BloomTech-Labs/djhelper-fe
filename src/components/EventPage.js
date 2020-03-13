<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, {useState, useEffect} from 'react';
>>>>>>> bc0051b45801eab63aad42ff8809242b2a9bc00c
import NavigationBar from './NavigationBar';
import Songs from './Songs';
import SongSearch from './SongSearch';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { searchForTrack } from '../actions/action';

<<<<<<< HEAD
const EventPage = props => {
  const dj_id = useSelector(state => state.userReducer.id);
  const FRONTEND_HOST =
    process.env.REACT_APP_FRONTEND_HOST || 'https://dj-helper.com/';

  const [qrCode, setQrCode] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);

  const {
    name,
    event_type,
    description,
    event_id,
    date
  } = props.location.state.event;

  const [search, setSearch] = useState({
    buttonText: 'Add Song',
    searchVisible: false
  });
  const dispatch = useDispatch();

  const handleClick = () => {
    let text;
    if (search.buttonText === 'Add Song') {
      text = 'Close Search';
    } else {
      text = 'Add Song';
      dispatch(searchForTrack(''));
    }
    setSearch({
      ...search,
      buttonText: text,
      searchVisible: !search.searchVisible
    });
  };

  /*
     * IN PROGRESS
    const handleMobileSwitchButtons => () {
        let
    }*/

  const searchVsPlaylist = () => {
    if (search.searchVisible) {
      return (
        <div className="playlist">
          <SongSearch />
        </div>
      );
    } else {
      return (
        <div className="playlist">
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

  return (
    <div className="event-page">
      <NavigationBar tokenPresent={props.location.state.tokenPresent} />
      <div className="event-details">
        <div className="event-description">
          <h3 className="bold">{name}</h3>
          <p>
            <b className="bold">Event Type:</b> {event_type}
          </p>
          <p>
            <b className="bold">Date: </b>
            {date}
          </p>
          <p>
            <b className="bold">Description: </b>
            {description}
          </p>
          <p>
            <b className="bold">Sharable Event Page:</b>{' '}
            <Link to={`/dj/${dj_id}/event/${event_id}`}>
              {`${FRONTEND_HOST}dj/${dj_id}/event/${event_id}`}
            </Link>
          </p>

          <button className="black-button"> Edit </button>

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
=======


const EventPage = (props) => {
    const { name, event_type, description, id, date } = props.location.state.event;

    const [switches, setSwitches] = useState({
        buttonText: 'Add Songs',
        searchVisible: false,
        requestButtonStyle: 'active',
        playlistButtonStyle: 'show',
        addSongsButtonStyle: 'hide',
        playlistView: 'show',
        requestView: 'show',
    });
    const {
        requestButtonStyle,
        playlistButtonStyle,
        addSongsButtonStyle,
        playlistView,
        requestView,
        playlistClass
    } = switches;

    const setAppSize = () => {
        if (window.innerWidth < 500) {
            setSwitches({...switches, playlistView: 'hide'})
        } else {
            setSwitches({...switches, playlistView: 'show'})
        }
    }

    useEffect(() => {
        setAppSize();
    }, [])

    const dispatch = useDispatch();

    const handleClick = () => {
        let text;
        if (switches.buttonText === 'Add Songs') {
            text='Close Search';
        } else {
            text='Add Songs';
            dispatch(searchForTrack(''));
        }
        setSwitches({...switches, buttonText: text, searchVisible: !switches.searchVisible
        });
    }

    const switchToRequests = () => {
        setSwitches({...switches,
                    requestButtonStyle: 'active',
                    playlistButtonStyle: 'show',
                    addSongsButtonStyle: 'hide',
                    playlistView: 'hide',
                    requestView: 'show',
        })
    }

    const switchToPlaylist = () => {
        setSwitches({...switches,
                    requestButtonStyle: 'show',
                    playlistButtonStyle: 'active',
                    addSongsButtonStyle: 'show',
                    playlistView: 'show',
                    requestView: 'hide'
        })
    }

    const searchVsPlaylist = () => {
        if (switches.searchVisible) {
            return (
              <div className={`playlist`}>
                <SongSearch />
              </div>
            )
        } else {
            return (
                <div className={`playlist`}>
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
            )
        }
    }
    return (
<div className='event-page'>
    <NavigationBar tokenPresent={props.location.state.tokenPresent} />
    <div className='event-details'>
        <div className='event-description'>
            <h3 className='bold'>{name}</h3>
            <p><b className='bold'>Event Type:</b> {event_type}</p>
            <p><b className='bold'>Date: </b>{date}</p>
            <p className='bold'>Description:</p>
            <p>{description}</p>
            <button className='black-button'> Edit </button>
            <h3 id='request-header-text-styling'> Requests </h3>

            <div className='mobile'>
                <div className='mobile-switch-buttons'>
                    <button className={`playlist-buttons ${requestButtonStyle}`}  onClick={() => switchToRequests()}>
                        Requests
                    </button>
                    <button className={`playlist-buttons ${playlistButtonStyle}`}  onClick={() => switchToPlaylist()}>
                        Playlist
                    </button>
                </div>
                <button className={`bold mobile-add-button ${addSongsButtonStyle}`} onClick={() => handleClick()}>{switches.buttonText}</button>
            </div>
            <div id='requests' className={`playlist ${requestView}`}>
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

>>>>>>> bc0051b45801eab63aad42ff8809242b2a9bc00c
            </div>
          )}
          <h3 id="request-header-text-styling"> Requests </h3>
          <div className="mobile-switch-buttons">
            <button className="playlist-buttons">Requests</button>
            <button className="playlist-buttons">Playlist</button>
          </div>
          <div className="playlist" id="requests">
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
            <Songs />
          </div>
        </div>
<<<<<<< HEAD
        <div className="event-playlist-location">
          <div className="label">
            <h5> Playlist </h5>
            <p className="bold" onClick={handleClick}>
              {search.buttonText}
            </p>
          </div>
          {searchVsPlaylist()}
=======
        <div className={`event-playlist-location ${playlistView}`}>
            <div className='label'>
                <h5> Playlist </h5>
                <p className='bold' onClick={handleClick}>{switches.buttonText}</p>
            </div>
            {searchVsPlaylist()}
>>>>>>> bc0051b45801eab63aad42ff8809242b2a9bc00c
        </div>
      </div>
    </div>
  );
};

export default EventPage;
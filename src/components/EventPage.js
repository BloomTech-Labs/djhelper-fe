import React, {useState, useEffect} from 'react';
import NavigationBar from './NavigationBar';
import Songs from './Songs';
import SongSearch from './SongSearch';
import {Link} from 'react-router-dom';

import {useDispatch } from 'react-redux';

import { searchForTrack } from '../actions/action';



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

            </div>
        </div>
        <div className={`event-playlist-location ${playlistView}`}>
            <div className='label'>
                <h5> Playlist </h5>
                <p className='bold' onClick={handleClick}>{switches.buttonText}</p>
            </div>
            {searchVsPlaylist()}
        </div>
    </div>
</div> )
}

export default EventPage;

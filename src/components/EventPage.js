import React, {useState} from 'react';
import NavigationBar from './NavigationBar';
import Songs from './Songs';
import SongSearch from './SongSearch';
import {Link} from 'react-router-dom';

import {useDispatch } from 'react-redux';

import { searchForTrack } from '../actions/action';


let requestButtonStyle = 'active';
let playlistButtonStyle = '';
let addSongsButtonStyle = 'hide';
let mobilePlaylistView = 'hide';
let mobileRequestView = '';

const EventPage = (props) => {
    const { name, event_type, description, id, date } = props.location.state.event;

    const [switches, setSwitches] = useState({
        buttonText: 'Add Songs',
        searchVisible: false,
        requestButtonActive: true,
        playlistButtonActive: false,
    });
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
        requestButtonStyle = 'active';
        playlistButtonStyle = '';
        addSongsButtonStyle = 'hide';
        mobilePlaylistView = 'hide';
        mobileRequestView = '';
        setSwitches({...switches, requestButtonActive: true, playlistButtonActive: false})
    }

    const switchToPlaylist = () => {
        requestButtonStyle = '';
        playlistButtonStyle = 'active';
        addSongsButtonStyle = '';
        mobilePlaylistView = '';
        mobileRequestView = 'hide';
        setSwitches({...switches, requestButtonActive: false, playlistButtonActive: true})
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
              <div className={`playlist ${mobilePlaylistView}`}>
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
                    <button className={` playlist-buttons ${requestButtonStyle}`}  onClick={() => switchToRequests()}>
                        Requests
                    </button>
                    <button className={`playlist-buttons ${playlistButtonStyle}`}  onClick={() => switchToPlaylist()}>
                        Playlist
                    </button>
                </div>
                <button className={`bold mobile-add-button ${addSongsButtonStyle}`} onClick={handleClick}>{switches.buttonText}</button>
            </div>
            <div className={`playlist ${mobileRequestView}' id='requests`}>
                <Songs />
                <Songs />
                <Songs />
                <Songs />
                <Songs />
                <Songs />
            </div>
        </div>
        <div className='event-playlist-location'>
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

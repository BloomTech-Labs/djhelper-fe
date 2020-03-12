import React, {useState} from 'react';
import NavigationBar from './NavigationBar';
import Songs from './Songs';
import SongSearch from './SongSearch';
import {Link} from 'react-router-dom';

import {useDispatch } from 'react-redux';

import { searchForTrack } from '../actions/action';

const EventPage = (props) => {
    const { name, event_type, description, id, date } = props.location.state.event;

    const [search, setSearch] = useState({
        buttonText: 'Add Song',
        searchVisible: false
    });
    const dispatch = useDispatch();

    const handleClick = () => {
        let text;
        if (search.buttonText === 'Add Song') {
            text='Close Search';
        } else {
            text='Add Song';
            dispatch(searchForTrack(''));
        }
        setSearch({...search, buttonText: text, searchVisible: !search.searchVisible
        });
    }


    /*
     * IN PROGRESS
    const handleMobileSwitchButtons => () {
        let
    }*/

    const searchVsPlaylist = () => {
        if (search.searchVisible) {
            return (

              <div className='playlist'>
                <SongSearch />
                </div>
            )
        } else {
            return (
              <div className='playlist'>
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
            <div className='mobile-switch-buttons'>
                <button className='playlist-buttons' >
                    Requests
                </button>
                <button className='playlist-buttons'>
                    Playlist
                </button>
            </div>
            <div className='playlist' id='requests'>
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
                <p className='bold' onClick={handleClick}>{search.buttonText}</p>
            </div>
            {searchVsPlaylist()}
        </div>
    </div>
</div> )
}

export default EventPage;

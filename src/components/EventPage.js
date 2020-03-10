import React, {useState} from 'react';
import NavigationBar from './NavigationBar';
import Songs from './Songs';
import SongSearch from './SongSearch';
import {Link} from 'react-router-dom';

const EventPage = (props) => {
    const { name, event_type, description, id, date } = props.location.state.event;

    const [search, setSearch] = useState({
        buttonText: 'Add Song',
        searchVisible: false
    });

    const handleClick = () => {
        setSearch({...search, buttonText: 'Close Search', searchVisible: !search.searchVisible
        });
    }

    const searchVsPlaylist = () => {
        if (search.searchVisible) {
            return (
                <SongSearch />
            )
        } else {
            return (
                <div>
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
        <button> Edit </button>
      <div className='playlist' id='requests'>
        <h3> Requests </h3>
        <Songs />
        <Songs />
        <Songs />
        <Songs />
        <Songs />
        <Songs />

      </div>

      </div>
      <div className='playlist'>
      <div id='add-song-div'>
        <h3> Playlist </h3>
        <p className='bold' onClick={handleClick}>{search.buttonText}</p>
    </div>
    {searchVsPlaylist()}
   </div>
</div>
</div>
    )
}

export default EventPage;

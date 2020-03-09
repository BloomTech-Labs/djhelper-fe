import React from 'react';
import NavigationBar from './NavigationBar';
import Songs from './Songs';


const EventPage = (props) => {
    console.log(props);
    const { name, event_type, description, id, date } = props.location.state.event;
    return (
   <div className="dashboard">
      <NavigationBar tokenPresent={props.location.state.tokenPresent} />
    <div className="preview-event-details">
      <div className="event-description">
        <h3 className="bold">{name}</h3>
        <p><b className="bold">Event Type:</b> {event_type}</p>
        <p><b className="bold">Date: </b>{date}</p>
        <p className="bold">Description:</p>
            <p>{description}</p>
        <button> Edit </button>
      </div>
      <div className="newest-song-requests">
        <h3> Playlist </h3>
        <Songs />
        <Songs />
        <Songs />
      </div>
    </div>
    </div>
    )
}

export default EventPage;

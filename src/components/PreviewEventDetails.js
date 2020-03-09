import React from 'react';
import Songs from './Songs';
import Dotdotdot from 'react-dotdotdot';

const PreviewEventDetails = props => {
  const { currentlyActive } = props;

  return (
    <div className="preview-event-details">
      <div className="event-description">
        <h3 className="bold">{currentlyActive.name}</h3>
        <p>
          <b className="bold">Event Type:</b> {currentlyActive.eventType}
        </p>
        <p>
          <b className="bold">Date: </b>
          {currentlyActive.date}
        </p>
        <p className="bold">Description:</p>
        <Dotdotdot clamp={3}>
          <p>{currentlyActive.description}</p>
        </Dotdotdot>
        <button type="button">Go to Event Page</button>
      </div>
      <div className="newest-song-requests">
        <h3> Newest Requests</h3>
        <Songs />
        <Songs />
        <Songs />
      </div>
    </div>
  );
};

export default PreviewEventDetails;

import React from 'react';
import Songs from './Songs';
import Dotdotdot from 'react-dotdotdot';

const PreviewEventDetails = props => {
  const { data, setData, currentlyActive } = props;

  return (
    <div className="preview-event-details">
      <div className="event-description">
        <h3 className="bold"> {currentlyActive.name}</h3>
        <p><b className="bold"> Event Type:</b> {currentlyActive.eventType}</p>
        <br />
        <p className="bold"> Description:</p>
        <Dotdotdot clamp={3}>
            <p>{currentlyActive.description}</p>
        </Dotdotdot>
      </div>
      <div className="newest-song-requests">
        <p> Newest Requests</p>
        <Songs />
        <Songs />
        <Songs />
      </div>
      <div className="genre-graph">
        <p> Genre graph goes here</p>
      </div>
    </div>
  );
};

export default PreviewEventDetails;

import React from 'react';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';
import Songs from './Songs';

import formatDate from '../utils/formatDate';

const PreviewEventDetails = props => {
  const { currentlyActive } = props;

  const formattedDate = formatDate(currentlyActive.date);

  return (
    <div className="preview-event-details">
      <div className="event-description">
        <h3 className="bold">{currentlyActive.name}</h3>
        <p>
          <b className="bold">Event Type:</b> {currentlyActive.event_type}
        </p>
        <p>
          <b className="bold">Date: </b>
          {formattedDate}
        </p>
        <p className="bold">Description:</p>
        <p>
          <Truncate lines={3}>{currentlyActive.description}</Truncate>
        </p>
        <Link
          to={{
            pathname: `/dj/event/${currentlyActive.event_id}`,
            state: {
              event: currentlyActive,
              tokenPresent: props.tokenPresent
            }
          }}
        >
          <button>Go to Event Page</button>
        </Link>
      </div>
      <div className="newest-song-requests">
        <h3> Newest Requests</h3>
        <div id="requests">
          <Songs />
          <Songs />
          <Songs />
        </div>
      </div>
    </div>
  );
};

export default PreviewEventDetails;

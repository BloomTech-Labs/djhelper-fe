import React from 'react';
import Songs from './Songs';
<<<<<<< HEAD
import Dotdotdot from 'react-dotdotdot';
import { Link } from 'react-router-dom';
=======
import Truncate from 'react-truncate';
import {Link} from 'react-router-dom';
>>>>>>> 834950b6f20002ab24936249224908fe528449f1

const PreviewEventDetails = props => {
  const { currentlyActive } = props;

  return (
    <div className="preview-event-details">
      <div className="event-description">
        <h3 className="bold">{currentlyActive.name}</h3>
        <p>
          <b className="bold">Event Type:</b> {currentlyActive.event_type}
        </p>
        <p>
          <b className="bold">Date: </b>
          {currentlyActive.date}
        </p>
        <p className="bold">Description:</p>
        <Truncate lines={3}>
          <p className='description'>{currentlyActive.description}</p>
        </Truncate>
        <Link to={{
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
        <Songs />
        <Songs />
        <Songs />
      </div>
    </div>
  );
};

export default PreviewEventDetails;

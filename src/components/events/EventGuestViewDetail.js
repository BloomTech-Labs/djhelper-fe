import React from 'react';
import { Route, Link } from 'react-router-dom';
import Modal from 'react-modal';

import * as Styles from '../Styles';
import TrackSearch from './TrackSearch';
import TrackCard from '../tracks/trackCard';
import PlaylistCard from '../tracks/playListCard';

import plus from '../../images/plus.png';

function EventGuestViewDetail({
  eventId,
  djId,
  event,
  deleteTrack,
  removePlaylistTrack,
  predictResults,
  getPredictionResults,
  toggleTrackSearchModal,
  trackSearchModalIsOpen,
  eventTrackList,
  eventPlayList,
  toggleEditEventModal,
  history,
  addVotes,
  userId
}) {
  const { name, date, notes, isExplicit } = event;

  return (
    <div className="eventDetail">
      <section className="eventDetailTop">
        <div className="eventDetailTop__one">
          <h1 className="heading-primary">
            <Link to={`/dj/${djId}/event/${eventId}`}>{name}</Link>
          </h1>
          <h2 className="heading-secondary">{date}</h2>
        </div>
        <div className="eventDetailTop__two">
          <p>{notes ? `${notes}` : 'no event description available'}</p>
        </div>
        <div className="eventDetailTop__three">
          <p>
            {isExplicit
              ? `Explicit tracks permitted`
              : `Explicit tracks not permitted`}
          </p>
        </div>
        <div className="eventDetailTop__four">
          <p>number of days away</p>
        </div>

        <div className="eventDetailTop__five">
          <button
            type="button"
            className="btn"
            onClick={() => history.push(`/dj/${djId}/event/${eventId}`)}
          >
            Request
          </button>
          <button
            onClick={() =>
              history.push(`/dj/${djId}/event/${eventId}/playlist`)
            }
            type="button"
            className="btn btn-history"
          >
            Playlist
          </button>
        </div>
      </section>

      <section className="eventDetailMiddle">
        {/* <button
          onClick={toggleTrackSearchModal}
          type="button"
          className="btn-trackRequest"
        >
          Request Tract
        </button> */}
        <button
          type="button"
          className="btn-trackRequest"
          onClick={toggleTrackSearchModal}
          style={{ background: '#808080', outline: 'none', border: 'none' }}
        >
          <img src={plus} alt="Add New Event" style={{ height: '100%' }} />
          <p className="request">Request a Track </p>
        </button>
      </section>

      <section className="eventDetailBottom">
        <Route exact path={`/dj/${djId}/event/${eventId}`}>
          <h1 className="heading-primary">Pending Requests</h1>

          {eventTrackList.map((track, index) => (
            <TrackCard
              key={track.id}
              track={track}
              index={index}
              getPredictionResults={getPredictionResults}
              predictResults={predictResults}
              eventId={eventId}
              deleteTrack={deleteTrack}
              isGuest="true"
              addVotes={addVotes}
              userId={userId}
            />
          ))}
        </Route>
        <Route exact path={`/dj/${djId}/event/${eventId}/playlist`}>
          <h1 className="heading-primary"> Event Playlist</h1>

          {eventPlayList.map((track, index) => (
            <PlaylistCard
              key={track.id}
              track={track}
              index={index}
              eventId={eventId}
              removePlaylistTrack={removePlaylistTrack}
              isGuest="true"
            />
          ))}
        </Route>
      </section>

      {/* Modal for Track Search */}
      <Modal
        isOpen={trackSearchModalIsOpen}
        onRequestClose={toggleTrackSearchModal}
        style={Styles.trackSearchModalStyles}
      >
        <TrackSearch
          isExplicit={isExplicit}
          eventId={eventId}
          toggleTrackSearchModal={toggleTrackSearchModal}
        />
      </Modal>
    </div>
  );
}

export default EventGuestViewDetail;

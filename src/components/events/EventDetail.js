import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import * as Styles from '../Styles';
import TrackSearch from './TrackSearch';
import TrackCard from '../tracks/trackCard';
import PlaylistCard from '../tracks/playListCard';

function EventDetail({
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
  history
}) {
  const { name, date, notes, isExplicit } = event;
  const [shareLinkModalIsOpen, setShareLinkModalIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleShareLinkModal = () => {
    setShareLinkModalIsOpen(!shareLinkModalIsOpen);
    setCopied(false);
  };

  return (
    <div className="eventDetail">
      <section className="eventDetailTop">
        <div className="eventDetailTop__one">
          <h1 className="heading-primary">
            <Link to={`/dj/event/${eventId}`}>{name}</Link>
          </h1>
          <h2 className="heading-secondary">{date}</h2>
        </div>
        <div className="eventDetailTop__two">
          <p>{notes ? `${notes}` : 'no event description available'}</p>
          <button type="button" onClick={toggleShareLinkModal} className="btn">
            Share Link
          </button>
        </div>
        <div className="eventDetailTop__three">
          <p>
            {isExplicit
              ? `Explicit tracks permitted`
              : `Explicit tracks not permitted`}
          </p>
          <button type="button" onClick={toggleEditEventModal} className="btn">
            Edit Event
          </button>
        </div>
        <div className="eventDetailTop__four">
          <p>number of days away</p>
        </div>

        <div className="eventDetailTop__five">
          <button
            type="button"
            className="btn"
            onClick={() => history.push(`/dj/event/${eventId}`)}
          >
            Requests
          </button>
          <button
            onClick={() => history.push(`/dj/event/${eventId}/playlist`)}
            type="button"
            className="btn btn-history"
          >
            Playlist
          </button>
        </div>
      </section>

      <section className="eventDetailMiddle">
        <button
          onClick={toggleTrackSearchModal}
          type="button"
          className="btn-trackRequest"
        >
          Request Track
        </button>
      </section>

      <section className="eventDetailBottom">
        <Route exact path={`/dj/event/${eventId}`}>
          <h1 className="heading-primary">Your Requests</h1>

          {eventTrackList.map((track, index) => (
            <TrackCard
              key={track.id}
              track={track}
              index={index}
              getPredictionResults={getPredictionResults}
              predictResults={predictResults}
              eventId={eventId}
              deleteTrack={deleteTrack}
            />
          ))}
        </Route>
        <Route exact path={`/dj/event/${eventId}/playlist`}>
          <h1 className="heading-primary">Your Playlist</h1>

          {eventPlayList.map((track, index) => (
            <PlaylistCard
              key={track.id}
              track={track}
              index={index}
              eventId={eventId}
              removePlaylistTrack={removePlaylistTrack}
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

      {/* sharable link modal */}
      <Modal
        isOpen={shareLinkModalIsOpen}
        onRequestClose={toggleShareLinkModal}
        style={Styles.shareLinkModalStyles}
      >
        <div className="sharelink">
          <h2 className="heading-secondary">Sharable Event Page:</h2>
          <p>
            <Link to={`/dj/${djId}/event/${eventId}`}>
              {`${window.location.origin.toString()}/dj/${djId}/event/${eventId}`}
            </Link>
          </p>
          <button
            className="sharelink__btn-icon"
            type="button"
            onClick={toggleShareLinkModal}
          >
            <FontAwesomeIcon icon="times" className="sharelink__icon" />
          </button>
          {/* copy to clipboard */}
          <div className="sharelink__copy">
            <CopyToClipboard
              text={`${window.location.origin.toString()}/dj/${djId}/event/${eventId}`}
              onCopy={() => setCopied(true)}
            >
              <button type="button" className="btn sharelink__btn-copy">
                Copy
              </button>
            </CopyToClipboard>

            {copied ? <p>Copied.</p> : null}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EventDetail;

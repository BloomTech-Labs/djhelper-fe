import React, { useState } from 'react';
import Modal from 'react-modal';

import * as Styles from '../Styles';
import PredictSearch from './predictSearch';
import TrackSearch from '../events/TrackSearch';
import MenuTrackCard from './menuTrackCard';

export default function TrackCard({
  track,
  index,
  predictResults,
  getPredictionResults,
  eventId,
  deleteTrack,
  isGuest,
  addVotes
}) {
  const count = index + 1;
  const [predictModalIsOpen, setPredictModalIsOpen] = useState(false);
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);

  const {
    artist_name,
    event_id,
    id,
    img,
    isExplicit,
    name,
    preview,
    spotify_id,
    url,
    votes
  } = track;

  const togglePlayAudio = e => {
    console.log('audio state: ', playAudio);
    e.preventDefault();
    const audio = new Audio(preview);

    if (playAudio === false) {
      audio.play();
    } else {
      audio.pause();
    }

    setPlayAudio(!playAudio);
  };
 
  const togglePredictModal = e => {
    setPredictModalIsOpen(!predictModalIsOpen);
  };
  const toggleMenuModal = e => {
    setMenuModalIsOpen(!menuModalIsOpen);
  };
  return (
    <>
      <div className="trackCard">
        <span className="trackCard__count">{count}</span>
        <button type="button" className="trackCard__img">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={img} alt="Track" />
          </a>
        </button>
        <button type="button" className="trackCard__name">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </button>

  <p style={{fontSize: '15px', marginRight: '10px'}}>{votes}</p>

        <button
        onClick={() => addVotes(id)}>
        Vote</button>


        <h2 className="trackCard__artistName">{artist_name}</h2>

        {preview === 'http://bit.ly/2nXRRfX' ? (
          ''
        ) : (
          <button
            type="button"
            className="trackCard__preview"
            onClick={togglePlayAudio}
          >
            Play Preview
          </button>
        )}

        <button
          onClick={togglePredictModal}
          type="button"
          className="trackCard__similar"
        >
          find similar
        </button>

        {isGuest ? (
          ''
        ) : (
          <button className="btn-menu" type="button" onClick={toggleMenuModal}>
            <span className="mobileMenIcon">&nbsp;</span>
          </button>
        )}
      </div>
      <Modal
        isOpen={predictModalIsOpen}
        onRequestClose={togglePredictModal}
        style={Styles.trackSearchModalStyles}
      >
        <TrackSearch
          isExplicit={isExplicit}
          eventId={eventId}
          toggleTrackSearchModal={togglePredictModal}
          spotifyId={spotify_id}
        />
      </Modal>

      <Modal
        isOpen={menuModalIsOpen}
        onRequestClose={toggleMenuModal}
        style={Styles.menuModalStyles}
      >
        <MenuTrackCard
          name={name}
          id={id}
          deleteTrack={deleteTrack}
          toggleMenuModal={toggleMenuModal}
        />
      </Modal>
    </>
  );
}

import React, { useState } from 'react';
import Modal from 'react-modal';

import * as Styles from '../Styles';
import MenuTrackCard from './menuTrackCard';

function PlayListCard({ track, index, eventId, removePlaylistTrack, isGuest }) {
  const count = index + 1;
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const {
    artist_name,
    event_id,
    id,
    img,
    isExplicit,
    name,
    preview,
    spotify_id,
    url
  } = track;

  const playAudio = e => {
    e.preventDefault();
    const audio = new Audio(preview);
    audio.play();
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
        <h2 className="trackCard__artistName">{artist_name}</h2>

        {preview === 'http://bit.ly/2nXRRfX' ? (
          ''
        ) : (
          <button
            type="button"
            className="trackCard__preview"
            onClick={playAudio}
          >
            Play Preview
          </button>
        )}
        {isGuest ? (
          ''
        ) : (
          <button type="button" onClick={toggleMenuModal}>
            <span className="mobileMenIcon">&nbsp;</span>
          </button>
        )}
      </div>

      <Modal
        isOpen={menuModalIsOpen}
        onRequestClose={toggleMenuModal}
        style={Styles.menuModalStyles}
      >
        <MenuTrackCard
          name={name}
          id={id}
          removePlaylistTrack={removePlaylistTrack}
          toggleMenuModal={toggleMenuModal}
          isPlaylist="true"
        />
      </Modal>
    </>
  );
}

export default PlayListCard;

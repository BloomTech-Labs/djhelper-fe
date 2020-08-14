import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Icon from '../../utils/icon';
import axiosWithAuth from '../../utils/axiosWithAuth';

import AddPlusButton from '../../images/add_plus_button.png';

const ResultCard = ({ addTrackResult, result, eventId }) => {
  const {
    artist_name,
    explicit,
    external_urls,
    id,
    image,
    preview,
    song_name
  } = result;

  const playAudio = e => {
    e.preventDefault();
    const audio = new Audio(preview);
    audio.play();
  };

  const handleSubmit = e => {
    e.preventDefault();
    addTrackResult(result, eventId)
      .then(res => {
        if (res.isExists) {
          toast.warning(
            `${res.name} already exists. Please choose another track`
          );
        } else {
          toast.success(`${res.name} track has been added`);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="resultCard">
      <span className="resultCard__img">
        <img src={image} alt="Track" />
      </span>
      <h2>{song_name}</h2>
      <p>{artist_name}</p>
      {preview === 'http://bit.ly/2nXRRfX' ? (
        ''
      ) : (
        <button
          type="button"
          className="resultCard__preview"
          onClick={playAudio}
        >
          Play Preview
        </button>
      )}
      <button className="resultCard__btn" type="button" onClick={handleSubmit}>
        <img src={AddPlusButton} alt="Add Track" />
      </button>
    </div>
  );
};

export default ResultCard;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Truncate from 'react-truncate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosWithAuthSpotifySearch } from '../utils/axiosWithAuthSpotify';

import {
  addSongToPlaylistDJ,
  removeSongFromPlaylistDJ,
  addVoteToSong
} from '../actions/action';

const Songs = props => {
  const dispatch = useDispatch();
  const url = window.location.pathname;
  const eventId = url.substring(url.lastIndexOf('/') + 1);

  Audio.prototype.stop = function() {
    this.pause();
    this.currentTime = 0;
  };
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
  }
  const imageList = {
    image1: require('../images/Blue.svg'),
    image2: require('../images/Orange.svg'),
    image3: require('../images/Green.svg'),
    image4: require('../images/Pink.svg'),
    image5: require('../images/Yellow.svg')
  };
  const [songState, setSongState] = useState({
    readyToPlay: true,
    audioObject: '',
    noPreview: false,
    songPlayVisible: false
  });

  const randomNum = getRandomIntInclusive(1, 5);
  const key = `image${randomNum}`;
  const songIcon = imageList[key];

  const handleClickSongVisible = () => {
    setSongState({ ...songState, songPlayVisible: !songState.songPlayVisible });
  };

  const playPreviewLink = id => {
    let preview_link;
    axiosWithAuthSpotifySearch()
      .get(`/tracks/${id}?market=US`)
      .then(response => {
        console.log(response.data);
        preview_link = response.data.preview_url;
        if (preview_link === null) {
          setSongState({ ...songState, noPreview: true });
        } else {
          const audio = new Audio(preview_link);
          console.log(audio);
          audio.stop();
          setSongState({
            ...songState,
            readyToPlay: !songState.readyToPlay,
            audioObject: audio
          });
          return audio.play();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const stopPreview = () => {
    songState.audioObject.stop();
    setSongState({
      ...songState,
      readyToPlay: !songState.readyToPlay,
      audioObject: ''
    });
  };

  const whichIcon = id => {
    if (songState.readyToPlay && !songState.noPreview) {
      return (
        <FontAwesomeIcon
          onClick={() => {
            playPreviewLink(id);
          }}
          icon="play"
          className="play-icon"
          size="1x"
        />
      );
    }
    if (!songState.readyToPlay) {
      return (
        <FontAwesomeIcon
          onClick={() => {
            stopPreview();
          }}
          icon="pause"
          className="play-icon"
          size="1x"
        />
      );
    }
    console.log('no preview available');
  };

  const isEditModeOn = id => {
    if (props.editModeOn) {
      return (
        <div className="song-element last-two">
          <button
            id="remove"
            onClick={() => {
              dispatch(removeSongFromPlaylistDJ(id, eventId));
            }}
          >
            <FontAwesomeIcon icon="minus" size="1x" />
          </button>
        </div>
      );
    }
  };

  const isSongPlayVisible = id => {
    if (songState.songPlayVisible) {
      return (
        <iframe
          className="playSong"
          src={`https://open.spotify.com/embed/track/${id}`}
          width="300"
          height="80"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
      );
    }
  };

  const placeholderVsResults = () => {
    if (props.items) {
      const { album, artists, name, id } = props.items;
      const songInfo = props.items;
      return (
        <div>
          <div className="songs">
            <button
              style={{ backgroundImage: `url(${album.images[2].url})` }}
              id="song-type"
            >
              {whichIcon(id)}
            </button>
            <div
              className="song-element name"
              onClick={() => handleClickSongVisible()}
            >
              <Truncate lines={1}>
                <p>{name}</p>
              </Truncate>
            </div>

            <div className="song-element">
              <Truncate lines={1}>
                <p>{album.name}</p>
              </Truncate>
            </div>
            <div className="song-element">
              <Truncate lines={1}>
                <p>{artists[0].name}</p>
              </Truncate>
            </div>

            {props.playlist ? (
              <div className="song-element">
                <button
                  id="vote"
                  onClick={() => {
                    dispatch(addVoteToSong(eventId, id));
                  }}
                >
                  <FontAwesomeIcon icon="caret-up" size="2x" />
                </button>
                <p>{props.items.votes}</p>
              </div>
            ) : (
              <div>
                <button
                  id="add"
                  onClick={() => {
                    dispatch(addSongToPlaylistDJ(songInfo, eventId));
                  }}
                >
                  <FontAwesomeIcon icon="plus" size="1x" />
                </button>
              </div>
            )}
            {isEditModeOn(id)}

            <br />
          </div>
          {isSongPlayVisible(id)}
        </div>
      );
    }
    return (
      <div className="songs">
        <button
          style={{ backgroundImage: `url(${songIcon})` }}
          id="song-type"
        />
        <div className="song-element">
          <Truncate lines={1}>
            <p> Song name title</p>
          </Truncate>
        </div>
        <div className="song-element">
          <Truncate lines={1}>
            <p> Album title </p>
          </Truncate>
        </div>

        <div className="song-element">
          <p> Artist Name</p>
        </div>
        <div className="song-element">
          <button id="vote">
            <FontAwesomeIcon icon="caret-up" size="2x" />
          </button>
          <p>003</p>
        </div>
      </div>
    );
  };

  return <>{placeholderVsResults()}</>;
};

export default Songs;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Truncate from 'react-truncate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosWithAuthSpotifySearch } from '../../utils/axiosWithAuthSpotify';

import {
  addSongToPlaylistDJ,
  removeSongFromPlaylistDJ,
  addVoteToSong,
  editQueueNum
} from '../../redux/actions/action';

const Songs = props => {
  const dispatch = useDispatch();
  const url = window.location.pathname;
  const eventId = url.substring(url.lastIndexOf('/') + 1);

  const [newQueueNum, setNewQueueNum] = useState(1);
  const handleInputChange = e => {
    setNewQueueNum(e.target.value);
  };
  const handleEditSubmit = (e, connections_id) => {
    e.preventDefault();
    dispatch(editQueueNum(connections_id, newQueueNum));
  };

  const handleDeleteSong = (songInfo, eventId) => {
    dispatch(removeSongFromPlaylistDJ(songInfo, eventId));
  };

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
    image1: require('../../images/Blue.svg'),
    image2: require('../../images/Orange.svg'),
    image3: require('../../images/Green.svg'),
    image4: require('../../images/Pink.svg'),
    image5: require('../../images/Yellow.svg')
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

  const isEditModeOn = (id, songInfo) => {
    if (props.editModeOn) {
      return (
        <div className="song-element last-two">
          {songInfo.queue_num}
          <form onSubmit={e => handleEditSubmit(e, songInfo.connections_id)}>
            <button type="submit" className="edit">
              <FontAwesomeIcon icon="arrows-alt-v" size="2x" />
            </button>
            <input
              type="number"
              min="0"
              step="1"
              name="queue_num_input"
              onChange={handleInputChange}
              value={newQueueNum}
            />
          </form>

          <button
            type="button"
            id="remove"
            onClick={() => {
              handleDeleteSong(songInfo, eventId);
            }}
          >
            <FontAwesomeIcon icon="times" size="1x" />
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
          title={`play track with spotify id #${id}`}
        />
      );
    }
  };

  const placeholderVsResults = () => {
    if (props.items) {
      // Display song info if props.items exists
      const { album, artists, name, id } = props.items;
      const songInfo = props.items;
      return (
        <div>
          <div className="songs">
            <button
              type="button"
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

            {!props.playlist && (
              <div>
                <button
                  type="button"
                  id="add"
                  onClick={() => {
                    dispatch(addSongToPlaylistDJ(songInfo, eventId));
                  }}
                >
                  <FontAwesomeIcon icon="plus" size="1x" />
                </button>
              </div>
            )}
            {isEditModeOn(id, songInfo)}

            <br />
          </div>
          {isSongPlayVisible(id)}
        </div>
      );
    }

    // If not props.items, display placeholder song info
    return (
      <div className="songs">
        <button
          type="button"
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
          <button id="vote" type="button">
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

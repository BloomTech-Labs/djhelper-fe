import React, {useState}from 'react';
import {axiosWithAuthSpotifySearch} from '../utils/axiosWithAuthSpotify';
import { useDispatch, useSelector } from 'react-redux';
import Truncate from 'react-truncate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addSongToPlaylistDJ, getTrackPreview } from '../actions/action';

const Songs = (props) => {
    const dispatch = useDispatch();
    const url = window.location.pathname;
    const event_id = url.substring(url.lastIndexOf('/') + 1);

    Audio.prototype.stop = function() {
        this.pause();
        this.currentTime = 0;
    };
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
    const imageList = {
        image1: require("../images/Blue.svg"),
        image2: require("../images/Orange.svg"),
        image3: require("../images/Green.svg"),
        image4: require("../images/Pink.svg"),
        image5: require("../images/Yellow.svg"),
    }
    const [songState, setSongState] = useState({
        readyToPlay: true,
        audioObject: '',
        noPreview: false,
    })


    let randomNum = getRandomIntInclusive(1,5)
    let key = 'image' + randomNum;
    let songIcon = imageList[key];

    const playPreviewLink = (id) => {
        let preview_link;
        axiosWithAuthSpotifySearch()
        .get(`/tracks/${id}?market=US`)
        .then(response => {
            console.log(response.data)
            preview_link =  response.data.preview_url;
            if (preview_link === null) {
                setSongState({...songState, noPreview: true})
            } else {
                let audio = new Audio(preview_link);
                console.log(audio);
                audio.stop();
                setSongState({...songState, readyToPlay: !songState.readyToPlay, audioObject: audio})
                return audio.play();
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const stopPreview = () => {
            songState.audioObject.stop()
            setSongState({...songState, readyToPlay: !songState.readyToPlay, audioObject: ''})
    }

    const whichIcon = (id) => {
        if (songState.readyToPlay && !songState.noPreview) {
            return (
                <FontAwesomeIcon onClick={() => {
                  playPreviewLink(id)
                  }}icon='play' className='play-icon' size="1x"/>
            )
        } else if (!songState.readyToPlay) {
            return (
                <FontAwesomeIcon onClick={() => {
                    stopPreview()
                  }}icon='pause' className='play-icon' size="1x"/>
            )
        } else {
            console.log('no preview available');
        }
    }

    const placeholderVsResults = () => {
        if (props.items) {
            const {album, artists, name, id} = props.items;
            let songInfo = props.items;
             return (
                <div className="songs">
                  <button style={{backgroundImage: `url(${album.images[2].url})`}} id='song-type' >
                  {whichIcon(id)}
                  </button>
                  <div className='song-element'>
                    <Truncate lines={1}>
                        <p>{name}</p>
                    </Truncate>
                </div>

                <div className='song-element'>
                    <Truncate lines={1}>

                        <p>{album.name}</p>
                    </Truncate>
                </div>
                <div className='song-element'>
                    <Truncate lines={1}>
                        <p>{artists[0].name}</p>
                    </Truncate>
                </div>


                { props.playlist ? (
                  <div className='song-element'>
                      <button id='vote' ><FontAwesomeIcon icon="caret-up" size="2x" /></button>
                        <p>003</p>
                  </div>
                ) : (
                    <div>
                      <button id='add' onClick={() => {
                        dispatch(addSongToPlaylistDJ(songInfo, event_id))

                      }}><FontAwesomeIcon icon="plus" size="1x" /></button>
                    </div>
                )}

                  <br />
                </div>
          );
        } else {
             return (
                <div className="songs">
                    <button style={{backgroundImage: `url(${songIcon})`}} id='song-type' ></button>
                    <div className='song-element'>
                        <Truncate lines={1}>
                            <p> Song name title</p>
                        </Truncate>
                    </div>
                    <div className='song-element'>
                        <Truncate lines={1}>
                            <p> Album title </p>
                        </Truncate>
                    </div>

                  <div className='song-element'>
                      <p> Artist Name</p>
                  </div>
                  <div className='song-element'>
                      <button id='vote'><FontAwesomeIcon icon="caret-up" size="2x" /></button>
                        <p>003</p>
                  </div>
                </div>
              );

        }
    }

  return (
      <>
          {placeholderVsResults()}
        </>
  );
};

export default Songs;

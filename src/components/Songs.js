import React from 'react';
import Truncate from 'react-truncate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Songs = (props) => {

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

    let randomNum = getRandomIntInclusive(1,5)
    let key = 'image' + randomNum;
    let songIcon = imageList[key];

    const placeholderVsResults = () => {
        if (props.items) {
             return (
                <div className="songs">
                  <button style={{backgroundImage: `url(${songIcon})`}} id='song-type' ></button>
                  <div className='song-element'>
                    <Truncate lines={1}>
                        <p>{props.items.name}</p>
                    </Truncate>
                </div>

                <div className='song-element'>
                    <Truncate lines={1}>
                        <p>{props.items.artists[0].name}</p>
                    </Truncate>
                </div>
                <div className='song-element'>
                    <Truncate lines={1}>
                        <p>{props.items.artists[0].name}</p>
                    </Truncate>
                </div>


                <div>
                  <button id='add'><FontAwesomeIcon icon="plus" size="1x" /></button>
                  </div>

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
      <div>
          {placeholderVsResults()}
        </div>
  );
};

export default Songs;

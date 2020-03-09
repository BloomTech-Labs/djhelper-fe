import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Songs = () => {

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
    console.log();

  return (
    <div className="songs">
      <button style={{backgroundImage: `url(${songIcon})`}} id='song-type' ></button>
      <p> Song name title</p>
      <br />
      <p> Artist Name</p>
      <br />
      <button id='vote'><FontAwesomeIcon icon="caret-up" size="2x" /></button> <p>003</p>
    </div>
  );
};

export default Songs;

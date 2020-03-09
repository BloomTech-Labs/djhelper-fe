import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Songs = () => {
  return (
    <div className="songs">
      <button id='song-type'></button>
      <p> Song name title</p>
      <br />
      <p> Artist Name</p>
      <br />
      <button id='vote'><FontAwesomeIcon icon="caret-up" size="2x" /></button> <p>003</p>
    </div>
  );
};

export default Songs;

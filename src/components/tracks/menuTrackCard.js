import React from 'react';
import { connect } from 'react-redux';

import * as playlistActions from '../../redux/actions/playlistActions';

function MenuTrackCard({
  name,
  id,
  deleteTrack,
  removePlaylistTrack,
  toggleMenuModal,
  moveTrack,
  isPlaylist
}) {
  const handleRemoveTrack = e => {
    if (isPlaylist) {
      removePlaylistTrack(id);
    } else {
      deleteTrack(id);
    }
    toggleMenuModal();
  };

  const handleMoveTrack = e => {
    moveTrack(id);
    toggleMenuModal();
  };

  return (
    <div className="menuTrackCard">
      <h2>Track Options</h2>
      <p>{name}</p>

      {isPlaylist ? (
        ''
      ) : (
        <button
          onClick={handleMoveTrack}
          type="button"
          className="btn btn-history"
        >
          Move to Playlist
        </button>
      )}
      <button
        onClick={handleRemoveTrack}
        type="button"
        className="btn btn-removeTrack"
      >
        Remove Track
      </button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    singleEvent: state.eventReducer.singleEvent,
    trackList: state.searchReducer.trackList,
    predictResults: state.searchReducer.predictResults
  };
};

const mapDispatchToProps = {
  moveTrack: playlistActions.moveTrack
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuTrackCard);

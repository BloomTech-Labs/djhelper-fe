import React from 'react';

export default function MenuTrackCard({
  name,
  id,
  deleteTrack,
  toggleMenuModal
}) {
  const handleRemoveTrack = e => {
    deleteTrack(id);
    toggleMenuModal();
  };
  return (
    <div className="menuTrackCard">
      <h2>Track Options</h2>
      <p>{name}</p>
      <button type="button" className="btn btn-history">
        Move to history
      </button>
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

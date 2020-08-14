import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as searchActions from '../../redux/actions/searchActions';

function PredictSearch({
  isExplicit,
  eventId,
  togglePredictModal,
  spotifyId,
  getPredictionResults,
  addTrackResult,
  predictResults
}) {
  useEffect(() => {
    getPredictionResults(spotifyId);
  });

  useEffect(() => {
    getPredictionResults(spotifyId, isExplicit);
  }, []);

  return (
    <div>
      <section className="searchResults">
        {predictResults.map(result => (
          <ResultCard
            addTrackResult={addTrackResult}
            key={result.id}
            result={result}
            eventId={eventId}
          />
        ))}
      </section>
    </div>
  );
}

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

  const handleSubmit = e => {
    e.preventDefault();
    addTrackResult(result, eventId);
  };
  return (
    <div className="resultCard">
      <span>img</span>
      <h2>{song_name}</h2>
      <p>{artist_name}</p>
      <button type="button" onClick={handleSubmit}>
        add song
      </button>
    </div>
  );
};

// TrackSearch.propTypes = {
//   match: PropTypes.oneOfType([PropTypes.object]).isRequired,
//   singleEvent: PropTypes.oneOfType([PropTypes.object]).isRequired,
//   getSingleEvent: PropTypes.func.isRequired
// };

const mapStateToProps = state => {
  return {
    predictResults: state.searchReducer.predictResults
  };
};

const mapDispatchToProps = {
  getPredictionResults: searchActions.getPredictionResults,
  addTrackResult: searchActions.addTrackResult
};

export default connect(mapStateToProps, mapDispatchToProps)(PredictSearch);

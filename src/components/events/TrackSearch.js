import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import Icon from '../../utils/icon';
import axiosWithAuth from '../../utils/axiosWithAuth';

import ResultCard from '../tracks/ResultCard';

import * as searchActions from '../../redux/actions/searchActions';

function TrackSearch({
  isExplicit,
  getSearchResults,
  searchResults,
  getSearchResultStart,
  addTrackResult,
  eventId,
  toggleTrackSearchModal,
  getPredictionResults,
  spotifyId
}) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (spotifyId) {
      getPredictionResults(spotifyId);
    }
  }, []);

  const handleChange = e => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    getSearchResults(value, isExplicit);
    setValue('');
  };

  return (
    <div>
      <section className="trackSearch">
        <button
          onClick={toggleTrackSearchModal}
          type="button"
          className="trackSearch__btnclose"
        >
          <FontAwesomeIcon icon="times" className="trackSearch__icon" />
        </button>
        <form onSubmit={handleSubmit}>
          <div className="trackSearch__input">
            <input type="text" name="search" onChange={handleChange} />
          </div>
          <div className="trackSearch__search">
            <button
              type="button"
              className="btn"
              data-testid="submit-button"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </form>
      </section>

      <section className="searchResults">
        {getSearchResultStart ? (
          <Loader type="Audio" color="purple" height={200} width={200} />
        ) : (
          searchResults.map(result => (
            <ResultCard
              addTrackResult={addTrackResult}
              key={result.song_name}
              result={result}
              eventId={eventId}
              getPredictionResults={getPredictionResults}
            />
          ))
        )}
      </section>
    </div>
  );
}

// TrackSearch.propTypes = {
//   match: PropTypes.oneOfType([PropTypes.object]).isRequired,
//   singleEvent: PropTypes.oneOfType([PropTypes.object]).isRequired,
//   getSingleEvent: PropTypes.func.isRequired
// };

const mapStateToProps = state => {
  return {
    searchResults: state.searchReducer.searchResults,
    getSearchResultStart: state.searchReducer.getSearchResultStart
  };
};

const mapDispatchToProps = {
  getSearchResults: searchActions.getSearchResults,
  addTrackResult: searchActions.addTrackResult,
  getPredictionResults: searchActions.getPredictionResults
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);

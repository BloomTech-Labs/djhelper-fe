import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Icon from '../../utils/icon';
import axiosWithAuth from '../../utils/axiosWithAuth';

import ResultCard from '../tracks/ResultCard';

import * as searchActions from '../../redux/actions/searchActions';

function TrackSearch({
  isExplicit,
  getSearchResults,
  searchResults,
  addTrackResult,
  eventId,
  toggleTrackSearchModal
}) {
  const [value, setValue] = useState('');

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
        {searchResults.map(result => (
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

// TrackSearch.propTypes = {
//   match: PropTypes.oneOfType([PropTypes.object]).isRequired,
//   singleEvent: PropTypes.oneOfType([PropTypes.object]).isRequired,
//   getSingleEvent: PropTypes.func.isRequired
// };

const mapStateToProps = state => {
  return {
    searchResults: state.searchReducer.searchResults
  };
};

const mapDispatchToProps = {
  getSearchResults: searchActions.getSearchResults,
  addTrackResult: searchActions.addTrackResult
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);

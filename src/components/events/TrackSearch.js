import React, { useState } from 'react';
import Icon from '../../utils/icon';
import axiosWithAuth from '../../utils/axiosWithAuth';

export default function TrackSearch() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = e => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .get(`/track/${value}`)
      .then(res => {
        const resultArrays = Object.keys(res.data).map(i => res.data[i]);
        setResults(resultArrays);
      })
      .catch(err => console.log(err));
  };

  console.log('results: ', results);
  return (
    <div>
      <section className="trackSearch">
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
        {results.map(result => (
          <ResultCard key={result.id} result={result} />
        ))}
      </section>
    </div>
  );
}

const ResultCard = props => {
  const { artist_name, explicit, external_urls, id, song_name } = props.result;
  return (
    <div className="resultCard">
      <span>img</span>
      <h2>{song_name}</h2>
      <p>{artist_name}</p>
      <span>add song</span>
    </div>
  );
};

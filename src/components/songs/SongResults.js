import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Songs from './Songs';

const SongResults = () => {
  const items = useSelector(state => state.songReducer.results);
  const [page, setPage] = useState({
    pageRangeMin: 0,
    pageRangeMax: 5
  });

  const handlePageChangeNext = () => {
    if (page.pageRangeMax < 20) {
      setPage({
        ...page,
        pageRangeMin: page.pageRangeMin + 5,
        pageRangeMax: page.pageRangeMax + 5
      });
    }
  };
  const handlePageChangePrevious = () => {
    if (page.pageRangeMin > 0) {
      setPage({
        ...page,
        pageRangeMin: page.pageRangeMin - 5,
        pageRangeMax: page.pageRangeMax - 5
      });
    }
  };

  let firstTwenty = [];
  if (items) {
    firstTwenty = items.slice(0, 20);
  }

  firstTwenty.sort((a, b) => b.popularity - a.popularity);
  const currentResults = firstTwenty.slice(
    page.pageRangeMin,
    page.pageRangeMax
  );

  const results = () => {
    if (firstTwenty.length > 0) {
      return (
        <>
          {currentResults.map(element => (
            <Songs items={element} key={element.id} />
          ))}
          <div className="page-change-buttons">
            <p className="text-buttons" onClick={handlePageChangePrevious}>
              Previous
            </p>
            <p className="text-buttons" onClick={handlePageChangeNext}>
              Next
            </p>
          </div>
        </>
      );
    }
    return <p>Whoops! No results.</p>;
  };

  return <div style={{ color: 'white' }}>{results()}</div>;
};

export default SongResults;

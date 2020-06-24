import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import SongResults from './SongResults';

import { searchForTrack } from '../../redux/actions/action';

const SongSearch = () => {
  const [searchInput, setSearchInput] = useState({
    searchTerm: ''
  });

  useEffect(() => {
    setSearchInput({ ...searchInput, searchTerm: '' });
    const initial = JSON.stringify(searchInput.searchTerm);
    dispatch(searchForTrack(initial));
  }, []);

  const dispatch = useDispatch();

  const handleChange = e => {
    setSearchInput({ ...searchInput, [e.target.name]: e.target.value });
    const query = JSON.stringify(searchInput.searchTerm);
    if (searchInput.searchTerm.length > 0) {
      dispatch(searchForTrack(query));
    }
  };

  return (
    <div className="search">
      <Input
        data-testid="songSearch"
        placeholder="Search artists, tracks..."
        name="searchTerm"
        type="text"
        id="search"
        onChange={handleChange}
        required
      />
      <div>
        <SongResults />
      </div>
    </div>
  );
};

export default SongSearch;

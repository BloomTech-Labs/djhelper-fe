import React, {useState, useEffect} from 'react';
import SongResults from './SongResults';
import { Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import { searchForTrack } from '../actions/action';

const SongSearch = () => {
    const [searchInput, setSearchInput] = useState({
        searchTerm: '',
    });

    useEffect(() => {
        setSearchInput({...searchInput, searchTerm: ''})
        let initial = JSON.stringify(searchInput.searchTerm);
            dispatch(searchForTrack(initial));
    }, [])

    const dispatch = useDispatch();

    const handleChange = e => {
        setSearchInput({ ...searchInput, [e.target.name]: e.target.value });
        let query = JSON.stringify(searchInput.searchTerm);
        console.log(query);
        if (searchInput.searchTerm.length > 0) {
            dispatch(searchForTrack(query));
        }
    };

    return (
        <div>
            <Input
              data-testid="songSearch"
              placeholder='Search artists, tracks...'
              name='searchTerm'
              type='text'
              id='search'
              onChange={handleChange}
              required
            />
            <div>
                <SongResults />
            </div>
        </div>
    )
}

export default SongSearch;

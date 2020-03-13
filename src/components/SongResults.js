import React from 'react';
import Songs from './Songs';
import { useSelector} from 'react-redux';

const SongResults = () => {


    const items = useSelector(state => state.songReducer.results);

    let firstTen = [];
    if (items) {
     firstTen = items.slice(0, 20);
    }

    const results = () => {
        if (firstTen.length > 0) {
            return (
                firstTen.map(element =>
                    <Songs items={element} />
                )
            )
        } else {
            return (
                <p> "Whoops! No results."</p>
            )
        }
    }


    return (
        <div style={{color:"white"}}>
            {results()}

        </div>
    )
}

export default SongResults;

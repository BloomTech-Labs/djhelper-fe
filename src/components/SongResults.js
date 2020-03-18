import React from 'react';
import Songs from './Songs';
import { useSelector} from 'react-redux';

const SongResults = () => {


    const items = useSelector(state => state.songReducer.results);

    let firstTen = [];
    if (items) {
     firstTen = items.slice(0, 20);
    }

    firstTen.sort((a, b) => b.popularity - a.popularity);

    const results = () => {
        if (firstTen.length > 0) {
            console.log(firstTen);
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

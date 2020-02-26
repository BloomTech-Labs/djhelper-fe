import React from 'react';


const Event = (props) => {
    return (
        <div className="events">
            <p> image {props.num}</p>
            <img src={require('../images/placeholder.jpeg')} alt="event image" />
        </div>

    )
}

export default Event;

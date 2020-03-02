import React from 'react';


const Event = (props) => {
    return (
        <div className="events">
            <p> image {props.num}</p>
            {props.data
                ?
            <button onClick={() =>
            props.setData({...props.data, active:`event${props.num}`})
            }>
                <img src={require('../images/placeholder.jpeg')} alt="event image" />
            </button>
            : <img src={require('../images/placeholder.jpeg')} alt="event image" />

            }
        </div>

    )
}

export default Event;

import React from 'react';



const EventPage = (props) => {
    console.log(props);
    const { name, event_type, description, id } = props.location.state.event;
    return (
        <div>
            <h1> This is the event page</h1>
            <p> Event Name: {name}</p>
        </div>
    )
}

export default EventPage;

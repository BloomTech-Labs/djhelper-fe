import React, { useState } from 'react';
import NavigationBar from './NavigationBar';

const AddEvent = props => {
  const [eventData, setEventData] = useState({});

  const handleInputChange = e => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(eventData);
    // TODO: Send eventData to the back end.
  };

  return (
    <div className="add-event">
      <NavigationBar />
      <form onSubmit={handleSubmit}>
        <legend>Add Event</legend>
        <div className="input-group">
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
            value={eventData.name}
          />
        </div>

        <div className="input-group">
          <label htmlFor="event_type">Type of Event: </label>
          <input
            type="text"
            name="event_type"
            id="event_type"
            onChange={handleInputChange}
            value={eventData.event_type}
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description: </label>
          <textarea
            type="text"
            name="description"
            id="description"
            onChange={handleInputChange}
            value={eventData.description}
          />
        </div>

        <div className="input-group">
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={handleInputChange}
            value={eventData.date}
          />
        </div>

        <div className="input-group">
          <label htmlFor="start_time">Start Time: </label>
          <input
            type="time"
            name="start_time"
            id="start_time"
            value={eventData.start_time}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="end_time">End Time: </label>
          <input
            type="time"
            name="end_time"
            id="end_time"
            value={eventData.end_time}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="address_line_1">Address Line 1: </label>
          <input
            type="text"
            name="address_line_1"
            id="address_line_1"
            onChange={handleInputChange}
            value={eventData.address_line_1}
          />
        </div>

        <div className="input-group">
          <label htmlFor="address-line-2">Address Line 2: </label>
          <input
            type="text"
            name="address_line_2"
            id="address_line_2"
            onChange={handleInputChange}
            value={eventData.address_line_2}
          />
        </div>

        <div className="input-group">
          <label htmlFor="city">City: </label>
          <input
            type="text"
            name="city"
            id="city"
            onChange={handleInputChange}
            value={eventData.city}
          />
        </div>

        <div className="input-group">
          <label htmlFor="state">State: </label>
          <input
            type="text"
            name="state"
            id="state"
            onChange={handleInputChange}
            value={eventData.state}
          />
        </div>

        <div className="input-group">
          <label htmlFor="zip">Zip: </label>
          <input
            type="text"
            name="zip"
            id="zip"
            onChange={handleInputChange}
            value={eventData.zip}
          />
        </div>

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;

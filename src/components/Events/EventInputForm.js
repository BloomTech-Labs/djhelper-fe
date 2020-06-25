import React from 'react';
import PropTypes from 'prop-types';

function EventInputForm({ handleSubmit, handleInputChange, eventData }) {
  return (
    <div className="main-form">
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="input-group">
            <label htmlFor="name">Event Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
              value={eventData.name}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="event_type"> Event Type: </label>
            <input
              type="text"
              name="event_type"
              id="event_type"
              onChange={handleInputChange}
              value={eventData.event_type}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={handleInputChange}
              value={eventData.description}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="notes">Notes:</label>
            <textarea
              type="textarea"
              name="notes"
              id="notes"
              onChange={handleInputChange}
              value={eventData.notes}
              // value={eventData.primaryContact}
            />
          </div>
          <div className="input-group">
            <label htmlFor="date">Event Date:</label>

            <input
              type="date"
              id="date"
              name="date"
              min={new Date()}
              onChange={handleInputChange}
              value={eventData.date}
            />
          </div>
          <button type="submit" data-testid="submit-button">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
}

EventInputForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  eventData: PropTypes.object.isRequired
};

export default EventInputForm;

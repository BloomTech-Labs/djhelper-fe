import React from 'react';
import PropTypes from 'prop-types';

function EventInputForm({ handleSubmit, handleInputChange, eventData }) {
  return (
    <div className="main-form">
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="input-group">
            <label htmlFor="name"></label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Event Name*"
              onChange={handleInputChange}
              value={eventData.name}
              required
            />
          </div>

       
          <div className="input-group">
            <label htmlFor="date">Event Date:</label>
           <input
              type="date"
              placeholder="Date*"
              id="date"
              name="date"
              min={new Date()}
              onChange={handleInputChange}
              value={eventData.date}
            />
          </div>
        </div>
        <div className="test_area">
          <div>Optional fields</div>
          <div> 
          <input
            type="checkbox"/>
          <label htmlFor="tracks">
            Allow repeat tracks
            </label>
            
            
            <p>
          <label htmlFor="notes"></label>
            <textarea
              type="textarea"
              name="notes"
              placeholder="Notes"
              id="notes"
              onChange={handleInputChange}
              value={eventData.notes}
              // value={eventData.primaryContact}
            />
            </p>
            </div>
            
          
          <button className="create" type="submit" data-testid="submit-button">
            Create
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

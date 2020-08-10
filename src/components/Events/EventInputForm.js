import React from 'react';
import PropTypes from 'prop-types';

function EventInputForm({
  handleSubmit,
  handleDeleteSubmit,
  handleInputChange,
  handleCheckedChange,
  eventData,
  isEditEvent
}) {
  return (
    <form onSubmit={handleSubmit}>
      <section className="section1">
        <div className="main-form">
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
              <label htmlFor="date"></label>
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
            <div>
              <input
                type="checkbox"
                name="isExplicit"
                id="isExplicit"
                onChange={handleCheckedChange}
                value={eventData.isExplicit}
                checked={eventData.isExplicit}
              />
              <label htmlFor="tracks">Allow explicit tracks</label>

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

            {isEditEvent ? (
              <>
                <button type="submit" className="btn">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={handleDeleteSubmit}
                >
                  Delete Event
                </button>
              </>
            ) : (
              <button
                className="create"
                type="submit"
                data-testid="submit-button"
              >
                Create
              </button>
            )}
          </div>
        </div>
      </section>
    </form>
  );
}

EventInputForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  eventData: PropTypes.object.isRequired
};

export default EventInputForm;

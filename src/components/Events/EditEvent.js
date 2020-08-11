import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import EventInputForm from './EventInputForm';

const EditEvent = ({
  event,
  editEvent,
  toggleEditEventModal,
  eventId,
  deleteEvent,
  history
}) => {
  const id = useSelector(state => state.userReducer.id);
  const [eventData, setEventData] = useState({
    dj_id: id,
    name: event.name,
    date: event.date,
    isExplicit: event.isExplicit,
    notes: event.notes
  });

  const handleInputChange = e => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckedChange = e => {
    setEventData({
      ...eventData,
      isExplicit: e.target.checked
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    editEvent(eventData, eventId);
    toggleEditEventModal();
  };

  const handleDeleteSubmit = e => {
    e.preventDefault();
    deleteEvent(eventId, history);
    toggleEditEventModal();
  };

  return (
    <div className="editEvent">
      <EventInputForm
        eventData={eventData}
        handleInputChange={handleInputChange}
        handleCheckedChange={handleCheckedChange}
        handleSubmit={handleSubmit}
        handleDeleteSubmit={handleDeleteSubmit}
        isEditEvent="true"
      />
    </div>
  );
};

export default EditEvent;

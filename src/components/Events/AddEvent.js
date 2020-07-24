import React, { useState } from './node_modules/react';
import { useSelector, useDispatch } from './node_modules/react-redux';
import NavigationBar from '../NavigationBar';

import { addEvent } from '../../actions/eventActions';
import EventInputForm from './EventInputForm';

const AddEvent = props => {
  const id = useSelector(state => state.userReducer.id);
  const [eventData, setEventData] = useState({
    dj_id: id,
    name: '',
    date: '',
    event_type: '',
    description: '',
    notes: ''
  });

  const dispatch = useDispatch();

  const handleInputChange = e => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('event to submit: ', eventData);
    dispatch(addEvent(eventData, props.history));
  };

  return (
    <div className="add-event">
      <NavigationBar />
      <div className="add-event-title">
        <h1>Add an Event</h1>
      </div>

      <EventInputForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        eventData={eventData}
      />
    </div>
  );
};

export default AddEvent;

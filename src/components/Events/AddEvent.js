import React, { useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import * as eventActions from '../../redux/actions/eventActions';
import EventInputForm from './EventInputForm';

const AddEvent = ({ actions, history, setModalIsOpen }) => {
  const id = useSelector(state => state.userReducer.id);
  const [eventData, setEventData] = useState({
    dj_id: id,
    name: '',
    date: '',
    isExplicit: false,
    notes: ''
  });

  // const dispatch = useDispatch();

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
    // dispatch(addEvent(eventData, props.history));
    actions.addEvent(eventData, history).then(newEvent => {
      console.log('new Event added: ', newEvent);
      if (newEvent.data) {
        toast.success(`${newEvent.data.name} event has been added`);
      } else {
        toast.error(`error occurred; ${newEvent} `);
      }

      setModalIsOpen(false);
    });
  };

  return (
    <div className="add-event">
      <div className="add-event-title">
        <h1>Create Event</h1>
      </div>
      <div className="field1">
        <p>*Required fields</p>
        <p>Optional fields</p>
      </div>

      <EventInputForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleCheckedChange={handleCheckedChange}
        eventData={eventData}
      />
    </div>
  );
};

AddEvent.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired
};
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addEvent: bindActionCreators(eventActions.addEvent, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);

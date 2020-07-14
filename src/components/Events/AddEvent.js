import React, { useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import NavigationBar from '../navigation/NavigationBar';

import * as eventActions from '../../redux/actions/eventActions';
import EventInputForm from './EventInputForm';

const AddEvent = ({ actions, history, setModalIsOpen }) => {
  const id = useSelector(state => state.userReducer.id);
  const [eventData, setEventData] = useState({
    dj_id: id,
    name: '',
    date: '',
    event_type: '',
    description: '',
    notes: ''
  });

  // const dispatch = useDispatch();

  const handleInputChange = e => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // dispatch(addEvent(eventData, props.history));
    actions.addEvent(eventData, history).then(newEvent => {
      toast.success(`${newEvent.data.name} event has been added`);
      setModalIsOpen(false);
    });
  };

  return (
    <div className="add-event">
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

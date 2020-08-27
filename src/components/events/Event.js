import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import formatDate from '../../utils/formatDate';
import event1 from '../../images/event1.png';
import event2 from '../../images/event2.png';
import event3 from '../../images/event3.png';
import event4 from '../../images/event4.png';
import event5 from '../../images/event5.png';
import event6 from '../../images/event6.png';
import EditEvent from '../events/EditEvent';

import * as Styles from '../Styles';

const Event = ({ event, editEvent }) => {
  const [editEventModal, setEditModal] = useState(false);

  const toggleEditModal = () => {
    setEditModal(!editEventModal);
  };

  const imageArray = [event1, event2, event3, event4, event5, event6];

  const randomImageGenerator = imgAr => {
    const number = Math.floor(Math.random() * imageArray.length);
    const image = imgAr[number];
    return image;
  };

  const generateNumberOfDays = eventDate => {
    const today = new Date();
    const futureDate = new Date(eventDate);
    const timeinmilisec = futureDate.getTime() - today.getTime();

    return Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      <div data-testid="event-component" className="eventCard">
        <img src={randomImageGenerator(imageArray)} alt="eventImages" />
        <h2>{event.name}</h2>
        <div>
          {event && <h3> #Notifications: </h3>}
          <p style={{ fontSize: '48px' }}>
            {`${generateNumberOfDays(event.date)} days away`}
          </p>
        </div>
      </div>
      <button className="btn-menu" type="button">
        {/* <span className="mobileMenIcon">&nbsp;</span> */}
        <Modal
          isOpen={editEventModal}
          onRequestClose={toggleEditModal}
          style={Styles.editEventModalStyles}
        >
          {/* <EditEvent
            event={this.props.singleEvent}
            toggleEditEventModal={this.toggleEditEventModal}
            editEvent={this.props.editEvent}
            eventId={this.state.eventId}
            deleteEvent={this.props.deleteEvent}
            history={this.state.history}
          /> */}

          <EditEvent
            toggleEditEventModal={toggleEditModal}
            editEvent={editEvent}
          />
        </Modal>
      </button>
    </>
  );
};

Event.propTypes = {
  event: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default Event;

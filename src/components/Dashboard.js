import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';

import DashboardWelcome from './DashboardWelcome';
import Event from './Events/Event';
import '@brainhubeu/react-carousel/lib/style.css';
import PreviewEventDetails from './Events/PreviewEventDetails';
import NavigationBar from './NavigationBar';

import { getEvents } from '../redux/actions/eventActions';
import AddEvent from './Events/AddEvent';

Modal.setAppElement('#root');
const customModalStyles = {
  overlay: { background: 'transparent' },
  content: {
    backgroundColor: '#2997ef',
    maxWidth: '400px',
    maxHeight: '450px',
    margin: 'auto'
  }
};

const Dashboard = props => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.userReducer.name);
  const events = useSelector(state => state.userReducer.events);
  const id = useSelector(state => state.userReducer.id);
  const [data, setData] = useState(events);
  const [upcomingIds, setUpcomingIds] = useState([]);
  const [pastIds, setPastIds] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const thing = data.active;
  const currentlyActive = data[thing];

  useEffect(() => {
    dispatch(getEvents(id));
  }, []);

  useEffect(() => {
    setData(events);
  }, [events]);

  useEffect(() => {
    // Creates an array with the 2 important properties: id and date
    const dateArray = Object.values(events).map(event => {
      const eventDate = new Date(event.date);
      eventDate.setDate(eventDate.getDate() + 1);
      return {
        event_id: event.event_id,
        formattedDate: eventDate
      };
    });

    // Divides the array into 2 sorted arrays: upcomingArray and pastArray, and sets the corresponding ids in state
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);

    const upcomingArray = dateArray
      .filter(x => x.formattedDate >= today)
      .sort((a, b) => a.formattedDate - b.formattedDate);
    setUpcomingIds(upcomingArray.map(event => event.event_id));

    const pastArray = dateArray
      .filter(x => x.formattedDate < today)
      .sort((a, b) => b.formattedDate - a.formattedDate);
    setPastIds(pastArray.map(event => event.event_id));
  }, [events]);

  console.log('upid', upcomingIds);

  const handleNewEvent = () => {
    props.history.push('/dj/addEvent');
  };
  const whichComponent = () => {
    if (data.active.length > 1) {
      return (
        <PreviewEventDetails
          data={data}
          setData={setData}
          currentlyActive={currentlyActive}
          tokenPresent={props.tokenPresent}
          history={props.history}
        />
      );
    }
    return <DashboardWelcome name={name} />;
  };

  return (
    <div className="dashboard">
      <NavigationBar tokenPresent={props.tokenPresent} />
      {whichComponent()}
      <h2>Events </h2>

      <div className="upcoming-events" data-testid="upcoming-carousel">
        <div
          className="eventCard"
          onClick={() => setModalIsOpen(true)}
          type="button"
        >
          {/* <h>Add new event</h> */}
          <FontAwesomeIcon icon="plus-circle" className="eventCard__icon" />
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customModalStyles}
        >
          <AddEvent setModalIsOpen={setModalIsOpen} history={props.history} />
          <div>
            <button
              className="btn-closeModal"
              onClick={() => setModalIsOpen(false)}
            >
              <FontAwesomeIcon icon="times" className="btn-closeModal__icon" />
            </button>
          </div>
        </Modal>

        {events &&
          upcomingIds.map(eventId => {
            return (
              <Event
                history={props.history}
                num={eventId}
                data={data}
                setData={setData}
                key={eventId}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;

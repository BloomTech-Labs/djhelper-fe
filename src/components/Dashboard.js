import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from '@brainhubeu/react-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DashboardWelcome from './DashboardWelcome';
import Event from './Event';
import '@brainhubeu/react-carousel/lib/style.css';
import PreviewEventDetails from './PreviewEventDetails';
import NavigationBar from './NavigationBar';

import { getEvents } from '../actions/action';

const Dashboard = props => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.userReducer.name);
  const events = useSelector(state => state.userReducer.events);
  const id = useSelector(state => state.userReducer.id);
  const [data, setData] = useState(events);
  const [upcomingIds, setUpcomingIds] = useState([]);
  const [pastIds, setPastIds] = useState([]);

  useEffect(() => {
    dispatch(getEvents(id));
  }, []);

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
    } else {
      return <DashboardWelcome name={name} />;
    }
  };

  let thing = data.active;
  let currentlyActive = data[thing];
  const handleNewEvent = () => {
    props.history.push('/dj/addEvent');
  };

  return (
    <div className="dashboard">
      <NavigationBar tokenPresent={props.tokenPresent} />
      {whichComponent()}

      <div className="upcoming-events" data-testid="upcoming-carousel">
        <div className="labels">
          <h5>Upcoming</h5>
          <button id="new-event" onClick={handleNewEvent}>
            <h6>Add new event</h6>
          </button>
        </div>
        <Carousel
          className="carousel"
          slidesPerPage={4}
          arrows
          arrowLeft={<FontAwesomeIcon icon="caret-left" size="2x" />}
          arrowRight={<FontAwesomeIcon icon="caret-right" size="2x" />}
          addArrowClickHandler
          infinite
        >
          {events &&
            upcomingIds.map(eventId => {
              return (
                <Event
                  num={eventId}
                  data={data}
                  setData={setData}
                  key={eventId}
                />
              );
            })}
        </Carousel>
      </div>
      <div className="past-events" data-testid="past-carousel">
        <h5> Past Events</h5>
        <Carousel
          className="carousel"
          slidesPerPage={4}
          arrows
          arrowLeft={<FontAwesomeIcon icon="caret-left" size="2x" />}
          arrowRight={<FontAwesomeIcon icon="caret-right" size="2x" />}
          addArrowClickHandler
          infinite
        >
          {events &&
            pastIds.map(eventId => {
              return (
                <Event
                  num={eventId}
                  data={data}
                  setData={setData}
                  key={eventId}
                />
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Carousel from '@brainhubeu/react-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DashboardWelcome from './DashboardWelcome';
import Event from './Event';
import '@brainhubeu/react-carousel/lib/style.css';
import PreviewEventDetails from './PreviewEventDetails';
import { pastEvents } from '../data/pastEvents';
import NavigationBar from './NavigationBar';
import { allEvents } from '../data/allEvents';

const Dashboard = props => {
  const name = useSelector(state => state.userReducer.name);
  const events = useSelector(state => state.userReducer.events);
  const [data, setData] = useState(events);
  const [pastEventData, setPastEventData] = useState(pastEvents);
  const [completeEvents, setCompleteEvents] = useState(allEvents);
  const [upcomingIds, setUpcomingIds] = useState([]);
  const [pastIds, setPastIds] = useState([]);

  useEffect(() => {
    const completeArray = Object.values(completeEvents);
    const dateArray = completeArray.map(event => {
      return {
        event_id: event.event_id,
        formattedDate: new Date(event.date)
      };
    });
    const sortedDateArray = dateArray.sort(
      (a, b) => b.formattedDate - a.formattedDate
    );
    const today = new Date();
    const upcomingArray = sortedDateArray.filter(x => x.formattedDate >= today);
    upcomingArray.sort((a, b) => a.formattedDate - b.formattedDate);
    const newUpcomingIds = upcomingArray.map(event => event.event_id);
    setUpcomingIds(newUpcomingIds);

    const pastArray = sortedDateArray.filter(x => x.formattedDate < today);
    const newPastIds = pastArray.map(event => event.event_id);
    setPastIds(newPastIds);
  }, [events]);
  // const eventIdsUnfiltered = Object.values(data).map(event => event.event_id);
  // const eventIds = eventIdsUnfiltered.filter(x => x !== undefined); // takes out the undefined ('active' prop has no value)
  // const pastEventIdsUnfiltered = Object.values(pastEventData).map(
  // event => event.event_id
  // );
  // const pastEventIds = pastEventIdsUnfiltered.filter(x => x !== undefined);
  const whichComponent = () => {
    if (data.active.length > 1) {
      return (
        <PreviewEventDetails
          data={data}
          setData={setData}
          currentlyActive={currentlyActive}
          tokenPresent={props.tokenPresent}
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
          {upcomingIds.map(eventId => {
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
          {pastIds.map(eventId => {
            return (
              <Event
                num={eventId}
                data={pastEventData}
                setData={setPastEventData}
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

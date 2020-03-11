import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Carousel from '@brainhubeu/react-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DashboardWelcome from './DashboardWelcome';
import Event from './Event';
import '@brainhubeu/react-carousel/lib/style.css';
import PreviewEventDetails from './PreviewEventDetails';
import { pastEvents } from '../data/pastEvents';
import NavigationBar from './NavigationBar';

const Dashboard = props => {
  const events = useSelector(state => state.userReducer.events);
  const [data, setData] = useState(events);
  const [pastEventData, setPastEventData] = useState(pastEvents);
  const name = useSelector(state => state.userReducer.name);
  const eventIdsUnfiltered = Object.values(data).map(event => event.event_id);
  const eventIds = eventIdsUnfiltered.filter(x => x !== undefined); //takes out the undefined ('active' prop has no value)

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
          {eventIds.map(eventId => {
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
          <Event num={1} data={pastEventData} setData={setPastEventData} />
          <Event num={2} data={pastEventData} setData={setPastEventData} />
          <Event num={3} data={pastEventData} setData={setPastEventData} />
          <Event num={4} data={pastEventData} setData={setPastEventData} />
        </Carousel>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavigationBar from './NavigationBar';
import PreviewEventDetails from './PreviewEventDetails';
import DashboardWelcome from './DashboardWelcome';
import Event from './Event';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { pastEvents } from '../data/pastEvents.js';

const Dashboard = props => {
  const [data, setData] = useState({
    event1: {
      name: 'Bill and Grace',
      description: 'A traditional, peaceful wedding.',
      newRequests: {
        'Mr Blue Sky': 'The Electric Light Orchestra',
        Eyes: 'Rogue Waves',
        "Don't Stop Me Now": 'Queen'
      }
    },
    event2: {
      name: 'Ellie and Mona',
      description: 'A more modern, fun wedding.',
      newRequests: {
        'Mr Blue Sky': 'The Electric Light Orchestra',
        Eyes: 'Rogue Waves',
        "Don't Stop Me Now": 'Queen'
      }
    },
    event3: {
      name: 'Charles and Elizabeth',
      description: 'A senior wedding.',
      newRequests: {
        'Mr Blue Sky': 'The Electric Light Orchestra',
        Eyes: 'Rogue Waves',
        "Don't Stop Me Now": 'Queen'
      }
    },
    event4: {
      name: 'Chris and Kat',
      description: 'Very atmospheric and sentimental wedding.',
      newRequests: {
        'Mr Blue Sky': 'The Electric Light Orchestra',
        Eyes: 'Rogue Waves',
        "Don't Stop Me Now": 'Queen'
      }
    },
    active: ''
  });

  const [pastEventData, setPastEventData] = useState(pastEvents);

  const name = useSelector(state => state.userReducer.name);

  const whichComponent = () => {
    if (data.active.length > 1) {
      return (
        <PreviewEventDetails
          data={data}
          setData={setData}
          currentlyActive={currentlyActive}
        />
      );
    } else {
      return <DashboardWelcome name={name} />;
    }
  };

  let thing = data.active;
  let currentlyActive = data[thing];
  return (
    <div className="dashboard">
      <NavigationBar tokenPresent={props.tokenPresent} />
      {whichComponent()}

      <div className="upcoming-events">
        <div className="labels">
          <h6> Upcoming Events</h6>
          <h6> Create a New Event</h6>
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
          <Event num={1} data={data} setData={setData} />
          <Event num={2} data={data} setData={setData} />
          <Event num={3} data={data} setData={setData} />
          <Event num={4} data={data} setData={setData} />
        </Carousel>
      </div>
      <div className="past-events">
        <h6> Past Events</h6>
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

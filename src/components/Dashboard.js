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
      eventType: 'A traditional, peaceful wedding.',
      description: "Couple is fairly young so audience may consist of primarlly young friends and older family members. Other things I may want to know include this and that and maybe some of Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      newRequests: {
        'Mr Blue Sky': 'The Electric Light Orchestra',
        Eyes: 'Rogue Waves',
        "Don't Stop Me Now": 'Queen'
      }
    },
    event2: {
      name: 'Ellie and Mona',
      eventType: 'A more modern, fun wedding.',
      description: "Couple is fairly young so audience may consist of primarlly young friends and older family members. Other things I may want to know include this and that and maybe some of Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      newRequests: {
        'Mr Blue Sky': 'The Electric Light Orchestra',
        Eyes: 'Rogue Waves',
        "Don't Stop Me Now": 'Queen'
      }
    },
    event3: {
      name: 'Charles and Elizabeth',
      eventType: 'A senior wedding.',
      description: "Couple is fairly young so audience may consist of primarlly young friends and older family members. Other things I may want to know include this and that and maybe some of Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      newRequests: {
        'Mr Blue Sky': 'The Electric Light Orchestra',
        Eyes: 'Rogue Waves',
        "Don't Stop Me Now": 'Queen'
      }
    },
    event4: {
      name: 'Chris and Kat',
      eventType: 'Very atmospheric and sentimental wedding.',
      description: "Couple is fairly young so audience may consist of primarlly young friends and older family members. Other things I may want to know include this and that and maybe some of Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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

      <div className="upcoming-events" data-testid="upcoming-carousel">
        <div className="labels">
          <h5>Upcoming</h5>
          <h6>Add new event</h6>
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
      <div className="past-events" data-testid="past-carousel">
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

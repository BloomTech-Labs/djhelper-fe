import React from 'react';
import './fontawesome';
import 'react-toastify/dist/ReactToastify.css';

import { Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './components/pages/Home';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import DjInterface from './components/djs/DjInterface';
import EventPage from './components/events/EventPage';
import About from './components/pages/About';
import DJProfile from './components/djs/DJProfile';
import SetUpProfile from './components/djs/SetUpProfile';
import AddEvent from './components/events/AddEvent';
import EventGuestView from './components/events/EventGuestView';
// import LoginModal from './components/LoginModal'

import './stylesheets/index.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />

        <PrivateRoute exact path="/dj" component={DjInterface} />
        <PrivateRoute exact path="/dj/event/:id" component={EventPage} />
        <PrivateRoute path="/dj/profile" component={DJProfile} />
        <Route path="/about" component={About} />
        <PrivateRoute path="/dj/setup" component={SetUpProfile} />
        <PrivateRoute path="/dj/addEvent" component={AddEvent} />
        <Route
          path="/dj/:dj_id/event/:event_id/location/:location_id"
          component={EventGuestView}
        />
      </BrowserRouter>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;

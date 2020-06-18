import React from 'react';
import './fontawesome';

import { Route, BrowserRouter } from 'react-router-dom';


import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import DjInterface from './components/DjInterface';
import EventPage from './components/EventPage';
import About from './components/About';
import DJProfile from './components/DJProfile';
import SetUpProfile from './components/SetUpProfile';
import AddEvent from './components/AddEvent';
import EventGuestView from './components/EventGuestView';
// import LoginModal from './components/LoginModal'

import './stylesheets/index.scss';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        
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
    </div>
  );
}

export default App;

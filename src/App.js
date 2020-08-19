import React from 'react';
import './fontawesome';
import 'react-toastify/dist/ReactToastify.css';

import { Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavigationBar from './components/navigation/NavigationBar';
import Home from './components/pages/Home';
import PrivateRoute from './components/PrivateRoute';
import DjInterface from './components/djs/DjInterface';
import About from './components/pages/About';
import DJProfile from './components/djs/DJProfile';
import SetUpProfile from './components/djs/SetUpProfile';
import ManageEventGuestView from './components/events/MangeEventGuestView';
import Help from './components/pages/Help';
import ManageEvent from './components/events/ManageEvent';

import './stylesheets/index.scss';

// this is for change

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={NavigationBar} />
        <Route path="/help" component={Help} />

        <Route exact path="/" component={Home} />

        <PrivateRoute exact path="/dj" component={DjInterface} />
        <PrivateRoute path="/dj/event/:id" component={ManageEvent} />
        <PrivateRoute path="/dj/profile" component={DJProfile} />
        <Route path="/about" component={About} />
        <PrivateRoute path="/dj/setup" component={SetUpProfile} />
        <Route
          path="/dj/:djId/event/:eventId"
          component={ManageEventGuestView}
        />
      </BrowserRouter>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;

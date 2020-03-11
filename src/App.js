import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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

import { registerUserAction } from './actions/action';

import './stylesheets/index.scss';

// import the library
import { library } from '@fortawesome/fontawesome-svg-core';

// import your icons
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(
  fas
  // more icons go here
);
function App() {
  const dispatch = useDispatch();
  //TODO: Hook the register submit button directly to registerUserAction since now the upcoming data is already formatted correctly.
  //This middle step is now not needed.
  const registerUser = (userInfo, history) => {
    console.log(userInfo);

    const infoNeeded = {
      username: userInfo.username,
      password: userInfo.password,
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      profile_pic_url: userInfo.profile_pic_url,
      bio: userInfo.bio,
      website: userInfo.website
    };

    dispatch(registerUserAction(infoNeeded, history));
  };

  return (
    <div className="App">
      <div className="overlay">
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route
            path="/register"
            render={props => (
              <Register {...props} registerUser={registerUser} />
            )}
          />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/dj" component={DjInterface} />
          <PrivateRoute exact path='/dj/event/:id' component={EventPage} />
          <PrivateRoute path="/dj/profile" component={DJProfile} />
          <Route path="/about" component={About} />
          <PrivateRoute path="/dj/setup" component={SetUpProfile} />
          <PrivateRoute path="/dj/addEvent" component={AddEvent} />
        </BrowserRouter>
      </div>
    </div>

  );
}

export default App;

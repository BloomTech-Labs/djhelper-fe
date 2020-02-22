import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import DjInterface from './components/DjInterface';

import { registerUserAction } from './actions/action';

import './App.scss';

function App() {
  
  const name = useSelector(state => state.userReducer.name);
  const dispatch = useDispatch();

  const registerUser = (userInfo, history) => {
    console.log(userInfo);
    
    //TODO: Once we have our own backend, we can also add phone and website to infoNeeded.
    //The placeholder backend doesn't have those properties.
    const infoNeeded = {
      username: userInfo.username,
      password: userInfo.password,
      name: userInfo.name
    }
    //For now, phone and website are stored in localStorage.
    if (userInfo.phone) {
      localStorage.setItem('phone', userInfo.phone);
    } else {
      localStorage.removeItem('phone');
    }

    if (userInfo.website) {
      localStorage.setItem('website', userInfo.website);
    } else {
      localStorage.removeItem('website');
    }

    localStorage.setItem('username', userInfo.username);

    dispatch(registerUserAction(infoNeeded, history));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          DJ Helper
        </h1>
        {name && <p>Welcome, {name}!</p>}
      </header>

      <Route exact path='/' component={Home} />
      <Route path='/register' render={props => <Register {...props} registerUser={registerUser} />} />
      <Route path='/login' component={Login} />

      <PrivateRoute path='/dj' component={DjInterface} />
      
    </div>
  );
}

export default App;

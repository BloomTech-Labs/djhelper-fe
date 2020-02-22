import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import DjInterface from './components/DjInterface';

import { setName, registerUserAction } from './actions/action';

import './App.scss';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
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
    }

    if (userInfo.website) {
      localStorage.setItem('website', userInfo.website);
    }

    dispatch(registerUserAction(infoNeeded, history));
  }

  const loginUser = (userInfo, history) => {
    console.log(userInfo);
    // TODO: Update url when available
    axios.post('https://business-card-collector.herokuapp.com/api/users/login', userInfo)
      .then(response => {
        console.log(response);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        dispatch(setName(response.data.user.name));
        history.push('/djs');
      })
      .catch(err => console.log(err));
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1>
          DJ Helper
        </h1>
        <p>{name}</p>
      </header>
      <Route exact path='/' render={props => <Home {...props} user={user} />} />

      <Route path='/register' render={props => <Register {...props} registerUser={registerUser} />} />
      <Route path='/login' render={props => <Login {...props} loginUser={loginUser} />} />
      {/*TODO: Modify path below to /djs/:id*/}
      <PrivateRoute path='/djs' component={DjInterface} />
      
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import {Route, Link} from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import DjInterface from './components/DjInterface';

import './App.scss';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  const registerUser = (userInfo, history) => {
    console.log(userInfo);
    const infoNeeded = {
      username: userInfo.username,
      password: userInfo.password,
      name: userInfo.name
    }
    // TODO: Update url when available
    axios.post('https://business-card-collector.herokuapp.com/api/users/register', infoNeeded)
      .then(response => {
        console.log(response);
        history.push('/login');
      })
      .catch(err => console.log(err));
  }

  const loginUser = (userInfo, history) => {
    console.log(userInfo);
    // TODO: Update url when available
    axios.post('https://business-card-collector.herokuapp.com/api/users/login', userInfo)
      .then(response => {
        console.log(response);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch(err => console.log(err));
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1>
          DJ Helper
        </h1>
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

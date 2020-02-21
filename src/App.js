import React, { useState } from 'react';
import {Route} from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
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
    axios.post('https://business-card-collector.herokuapp.com/api/users/register', infoNeeded)
      .then(response => {
        console.log(response);
        setUser(response.data.user);
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
      {!user && <h2>Welcome, please register or log in to continue.</h2>}
      {user && <h2>Welcome, {user.name}!</h2>}
      
      <Route path='/register' render={props => <Register {...props} registerUser={registerUser} />} />
      <Route path='/login' component={Login}/>
    </div>
  );
}

export default App;

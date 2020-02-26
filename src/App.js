import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import DjInterface from './components/DjInterface';

import { registerUserAction } from './actions/action';

import './stylesheets/index.scss';

function App() {

  const dispatch = useDispatch();

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
    }

    dispatch(registerUserAction(infoNeeded, history));
  }

  return (
        <div className="App">
            <div className="overlay">
            <BrowserRouter>
                <Route exact path='/' component={Home} />
                <Route path='/register' render={props => <Register
                    {...props}
                    registerUser={registerUser}
                    />
                } />
                <Route path='/login' component={Login} />
                <PrivateRoute path='/dj' component={DjInterface} />
          </BrowserRouter>
            </div>
        </div>

  );
}

export default App;

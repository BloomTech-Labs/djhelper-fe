import React from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import DjInterface from './components/DjInterface';

import { registerUserAction, logoutUser } from './actions/action';

import './stylesheets/index.scss';

function App() {

  const name = useSelector(state => state.userReducer.name);
  const dispatch = useDispatch();

  const registerUser = (userInfo, history) => {
    console.log(userInfo);

    //TODO: Once we have our own backend, we will need to rename the phone_number to phone and profile_img_src to website.
    //The placeholder backend has different names for those fields.
    // Add website
    // bio: userInfo.bio
    const infoNeeded = {
      username: userInfo.username,
      password: userInfo.password,
      name: userInfo.name,
      email: userInfo.email,
      phone_number: userInfo.phone,
      profile_img_src: userInfo.profile_pic_url,
      job_description: userInfo.bio
    }

    dispatch(registerUserAction(infoNeeded, history));
  }

  const handleLogout = () => {
    console.log('time to logout');
    dispatch(logoutUser());
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

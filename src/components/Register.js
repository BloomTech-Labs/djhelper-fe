import React, { useState } from 'react';
import { Form, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigationBar from './NavigationBar';

import { registerUserAction } from '../redux/actions/action';

const Register = props => {
  const history = useHistory();

  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    repassword: '',
    email: ''
  });

  const isRegistering = useSelector(
    state => state.userReducer.registerUserStart
  );

  const handleSubmit = e => {
    e.preventDefault();
    const infoNeeded = {
      username: userInfo.username,
      password: userInfo.password,
      email: userInfo.email
    };
    dispatch(registerUserAction(infoNeeded, history));
  };

  const handleChange = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const passwordValidation = () => {
    if (userInfo.password.length >= 1) {
      if (userInfo.password.length >= 8) {
        return (
          <Input
            valid
            name="password"
            type="password"
            id="password"
            required
            onChange={handleChange}
          />
        );
      }
      return (
        <Input
          invalid
          name="password"
          type="password"
          id="password"
          required
          onChange={handleChange}
        />
      );
    }
    return (
      <Input
        name="password"
        type="password"
        id="password"
        required
        onChange={handleChange}
      />
    );
  };

  const repasswordValidation = () => {
    if (userInfo.repassword.length >= 1) {
      if (userInfo.password === userInfo.repassword) {
        return (
          <Input
            valid
            name="repassword"
            type="password"
            id="repassword"
            required
            onChange={handleChange}
          />
        );
      }
      return (
        <Input
          invalid
          name="repassword"
          type="password"
          id="repassword"
          required
          onChange={handleChange}
        />
      );
    }
    return (
      <Input
        name="repassword"
        type="password"
        id="repassword"
        required
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="registration-page">
      {/* <NavigationBar /> */}
      <div className="registration-page-block">
        <h1>Know what your audience wants.</h1>
      </div>

      <div className="registration-page-block">
        {isRegistering && (
          <div className="loader">
            <Loader type="Audio" color="purple" height={200} width={200} />
          </div>
        )}

        {!isRegistering && (
          <Form data-testid="registerForm" onSubmit={handleSubmit}>
            <legend>Register</legend>
            <hr />
            <div>
              <label htmlFor="email">Email</label>
              <Input
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <Input
                name="username"
                type="text"
                id="username"
                required
                onChange={handleChange}
              />
            </div>
            <div className="password-area">
              <div>
                <label htmlFor="password">Password</label>
                {passwordValidation()}
              </div>
              <div>
                <label htmlFor="repassword">Confirm Password</label>
                {repasswordValidation()}
              </div>
            </div>

            <button type="submit">Submit</button>

            <p>
              Already have an account?{' '}
              <span className="bold-text">
                <Link data-testid="toLogin" to="/login">
                  Login here
                </Link>
              </span>
              .
            </p>
          </Form>
        )}
      </div>
    </div>
  );
};

Register.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired })
};

export default Register;

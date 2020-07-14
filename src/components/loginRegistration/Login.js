import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loginUser } from '../../redux/actions/action';
import LoginForm from './loginForm';

const Login = ({ toggleLoginModal, toggleRegisterModal }) => {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({
    username: '',
    password: ''
  });

  const toggleRgistration = () => {
    toggleLoginModal();
    toggleRegisterModal();
  };

  const isLoggingIn = useSelector(state => state.userReducer.loginUserStart);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(userInfo, history));
  };

  const handleChange = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      {isLoggingIn && (
        <div className="loader">
          <Loader type="Audio" color="purple" height={200} width={200} />
        </div>
      )}

      {!isLoggingIn && (
        <>
          <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} />

          <div className="form-extra">
            <p>
              Don&rsquo;t have an account yet?&nbsp;
              <b>
                <button
                  type="button"
                  className="btn-link"
                  onClick={toggleRgistration}
                >
                  Sign up!
                </button>
              </b>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

Login.propTypes = {};

export default Login;

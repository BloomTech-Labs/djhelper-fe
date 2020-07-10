import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { registerUserAction } from '../../redux/actions/action';

import RegisterForm from './registerForm';

const Register = ({ toggleLoginModal, toggleRegisterModal }) => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    repassword: '',
    email: ''
  });

  const history = useHistory();

  const toggleLogin = () => {
    toggleRegisterModal();
    toggleLoginModal();
  };

  const dispatch = useDispatch();

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

  return (
    <div className="login">
      <RegisterForm
        userInfo={userInfo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <div className="form-extra">
        <p>
          <b>
            Already have an account?&nbsp;
            <button type="button" className="btn-link" onClick={toggleLogin}>
              Login here
            </button>
          </b>
        </p>
      </div>
    </div>
  );
};

Register.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired })
};

export default Register;

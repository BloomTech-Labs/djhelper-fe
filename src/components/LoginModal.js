import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import NavigationBar from './NavigationBar';
import Modal from 'react-modal';

import { loginUser } from '../actions/action';

const LoginModal = props => {
    const [userInfo, setUserInfo] = useState({
      username: '',
      password: ''
    });
    
  const [modalIsOpen, setIsOpen]=useState(false)

  const openModal=()=>{
    setIsOpen(true)
  }
  const closeModal=()=>{
    setIsOpen(false)
  }

  const isLoggingIn = useSelector(state => state.userReducer.loginUserStart);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(userInfo, props.history));
  };

  const handleChange = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
     <NavigationBar />
      
      {isLoggingIn && (
        <div className="loader">
          <Loader type="Audio" color="purple" height={200} width={200} />
        </div>
      )}

      {!isLoggingIn && (
        
        <form onSubmit={handleSubmit}>

        <Modal isOpen={modalIsOpen}
          onRequestClose={closeModal}>
          <legend>Welcome back!</legend>
          <hr />
          <div>
            <label htmlFor="username">Username: </label>
            <Input
              id="username"
              data-testid="usernameInput"
              name="username"
              type="text"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <Input
              data-testid="passwordInput"
              name="password"
              type="password"
              id="password"
              required
              onChange={handleChange}
            />
          </div>

          <button data-testid="submit-button" type="submit">
            Login
          </button>

          <p>
            Don&rsquo;t have an account yet?{' '}
            <b>
              <Link data-testid="toRegistration" to="/register">
                Register here!
              </Link>
            </b>
          </p>
          
          
       
        
        </Modal>
        </form>
      )}
  
    
    </div>
    
  );
};

// Login.propTypes = {
//   history: PropTypes.shape({ push: PropTypes.func.isRequired })
// };

export default LoginModal;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import Modal from 'react-modal';

import { loginUser, logoutUser } from '../redux/actions/action';
import * as Styles from './Styles';

import Login from './loginRegistration/Login';
import Register from './Register';

const NavigationBar = props => {
  const tokenPresent = useSelector(state => state.userReducer.tokenPresent);
  const { token } = localStorage;

  let home;
  let djProfile;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: ''
  });
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal2 = () => {
    setIsOpen2(true);
  };
  const closeModal2 = () => {
    setIsOpen2(false);
  };

  const navState = () => {
    if (tokenPresent || props.tokenPresent) {
      return (
        <Nav className="navElementsIcons" navbar>
          {/* {selectedIcon()} */}
          <NavItem id="profile">
            <NavLink
              to="/dj/profile"
              className={djProfile}
              data-testid="profile"
            >
              {/* <FontAwesomeIcon icon="user" size="2x" /> */}
            </NavLink>
          </NavItem>
          <NavItem id="home">
            <NavLink id="home" className={home} data-testid="home" to="/dj">
              {/* <FontAwesomeIcon icon="home" size="2x" /> */}
            </NavLink>
          </NavItem>
          <NavItem className="links">
            {/* <NavLink to="/about">About</NavLink> */}
            <Nav className="logout-item" onClick={handleLogout}>
              Logout
            </Nav>
          </NavItem>
        </Nav>
      );
    }

    return (
      <Nav className="navElements" navbar>
        <NavItem>
          <button className="button-signup" type="button" onClick={openModal}>
            Sign In
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={Styles.loginModalStyles}
          >
            <Login />
          </Modal>
        </NavItem>

        <NavItem>
          <button
            className="register-button"
            type="button"
            onClick={openModal2}
          >
            Sign Up
          </button>
          <Modal isOpen={modalIsOpen2} onRequestClose={closeModal2}>
            <Register />
          </Modal>
        </NavItem>
      </Nav>
    );
  };
  const staticMenu = () => {
    return (
      <Nav className="navElementsStatice" navbar>
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/help">Help</NavLink>
        </NavItem>
      </Nav>
    );
  };
  return (
    <Navbar className="navBar" data-testid="navBar" dark expand="md">
      <div className="navBar__static">
        <NavbarBrand>DJ Helper</NavbarBrand>
        {staticMenu()}
      </div>
      {navState()}
    </Navbar>
  );
};
export default NavigationBar;

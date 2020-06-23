import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import Modal from 'react-modal';

import { loginUser, logoutUser } from '../actions/action';

import Login from './Login';

const NavigationBar = props => {
  const tokenPresent = useSelector(state => state.userReducer.tokenPresent);
  const token = localStorage.token;

  let home;
  let djProfile;

  const [modalIsOpen, setIsOpen] = useState(false);
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
            SignIn
          </button>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <Login />
          </Modal>
        </NavItem>
        <NavItem className="button-signup">
          <NavLink data-testid="register-nav" to="/register">
            sign up
          </NavLink>
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

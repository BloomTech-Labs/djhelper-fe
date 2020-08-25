import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import Login from '../loginRegistration/Login';
import Register from '../loginRegistration/Register';

import * as Styles from '../Styles';
import NavItems from './NavItems';
import Help from '../pages/Help';

export default function NavLogic({
  toggleHelpModal,
  toggleLoginModal,
  loginModalIsOpen,
  toggleRegisterModal,
  registerModalIsOpen,
  token,
  handleLogout,

  NavigationItemStyle,
  navOpen,
  toggleNavItem,
  currentWindowWidth
}) {
  const isActivStyle = navOpen ? 'mobileNav__active' : '';

  if (token) {
    return (
      <ul className={`${NavigationItemStyle} ${isActivStyle}`}>
        {currentWindowWidth <= 900 ? (
          <h2 className="mobileNav__title">Options</h2>
        ) : (
          ''
        )}

        <button
          className="btn"
          type="button"
          onClick={() => {
            toggleNavItem();
            toggleHelpModal();
          }}
        >
          Help
        </button>

        {NavItems.map(item => (
          <li key={item.name}>
            <Link onClick={toggleNavItem} to={item.path}>
              {item.name}
            </Link>
          </li>
        ))}
        <button
          type="button"
          onClick={() => {
            handleLogout();
            toggleNavItem();
          }}
        >
          Logout
        </button>
      </ul>
    );
  }

  return (
    <Nav className={`${NavigationItemStyle} ${isActivStyle}`} navbar>
      {currentWindowWidth <= 900 ? (
        <h2 className="mobileNav__title">Options</h2>
      ) : (
        ''
      )}
      <NavItem onClick={toggleNavItem}>
        <button className="btn" type="button" onClick={toggleHelpModal}>
          Help
        </button>
      </NavItem>

      <NavItem onClick={toggleNavItem}>
        <button
          className="btn btn-login"
          type="button"
          onClick={toggleLoginModal}
        >
          Sign In
        </button>
        <Modal
          isOpen={loginModalIsOpen}
          onRequestClose={toggleLoginModal}
          style={Styles.loginModalStyles}
        >
          <Login
            toggleLoginModal={toggleLoginModal}
            toggleRegisterModal={toggleRegisterModal}
          />
        </Modal>
      </NavItem>

      <NavItem onClick={toggleNavItem}>
        <button
          className="btn btn-signup"
          type="button"
          onClick={toggleRegisterModal}
        >
          Sign Up
        </button>
        <Modal
          isOpen={registerModalIsOpen}
          onRequestClose={toggleRegisterModal}
          style={Styles.registerModalStyles}
        >
          <Register
            toggleLoginModal={toggleLoginModal}
            toggleRegisterModal={toggleRegisterModal}
          />
        </Modal>
      </NavItem>
    </Nav>
  );
}

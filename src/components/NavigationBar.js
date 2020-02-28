import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../actions/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link, NavLink} from 'react-router-dom';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';


const NavigationBar = (props) => {
    const tokenPresent = useSelector(state => state.userReducer.tokenPresent);

    let home;
    let djProfile;
    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(logoutUser());
    }
    const selectedIcon = () => {
        console.log(window.location.pathname);
        let url = window.location.pathname;
        if (url === '/dj') {
           home = "selected";
           djProfile = "";
        } else {
            home = "";
            djProfile = "selected";
        }
    }

    const navState = () => {
        if (tokenPresent) {
            return (
              <Nav className="navElementsIcons" navbar>
              {selectedIcon()}
                <NavItem id="profile">
                        <NavLink to="/dj/profile" className={djProfile} data-testid='register-nav'>
                              <FontAwesomeIcon
                                icon="user"
                                size="1x"
                            />
                      </NavLink>
                </NavItem>
                <NavItem id="home">
                      <NavLink id="home" className={home} data-testid='register-nav' to="/dj">
                              <FontAwesomeIcon
                                icon="home"
                                size="1x"
                            />
                      </NavLink>
                </NavItem>

                <NavItem className="links">
                  <NavLink to="/">About</NavLink>
                        <Nav onClick={handleLogout}>Logout</Nav>
                </NavItem>
             </Nav>
            )
        } else {
            return (

              <Nav className=" navElements" navbar>
                    <NavItem>
                      <NavLink data-testid='register-nav' to="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="/about">About</NavLink>
                    </NavItem>
                    <NavItem>
                           <NavLink to="/login">Login</NavLink>
                    </NavItem>

             </Nav>
            )
        }
    }

    return (
        <Navbar className="navBar" data-testid="navBar" dark expand="md">
            <NavbarBrand className="navElements" href="/">DJ Helper</NavbarBrand>
              {navState()}
        </Navbar>
    )
}


export default NavigationBar;

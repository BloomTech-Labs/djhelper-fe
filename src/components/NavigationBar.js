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

    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(logoutUser());
    }

    const navState = () => {
        if (tokenPresent) {
            return (
              <Nav className="navElementsIcons" navbar>
                <NavItem className="icons">
                        <NavLink to="/dj/profile" className="icons" data-testid='register-nav'>
                              <FontAwesomeIcon
                                icon="user"
                                size="2x"
                            />
                      </NavLink>
                </NavItem>
                <NavItem className="icons">
                      <NavLink id="home" data-testid='register-nav' to="/dj">
                              <FontAwesomeIcon
                                icon="home"
                                size="2x"
                            />
                      </NavLink>
                </NavItem>

                <NavItem>
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

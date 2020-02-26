import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../actions/action';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';


const NavigationBar = (props) => {
    const tokenPresent = useSelector(state => state.userReducer.tokenPresent);

    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(logoutUser());
    }

    return (
        <Navbar className="navBar" data-testid="navBar" dark expand="md">
            <NavbarBrand className="navElements" href="/">DJ Helper</NavbarBrand>
              <Nav className=" navElements" navbar>
                <NavItem>
                  <NavLink  data-testid='register-nav' href="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/Lambda-School-Labs/djhelper-fe">GitHub</NavLink>
                </NavItem>
                <NavItem>
                    {tokenPresent
                        ? <NavLink  onClick={handleLogout}>Logout</NavLink>
                        : <NavLink href="/login">Login</NavLink>
                    }
                </NavItem>
         </Nav>
        </Navbar>
    )
}


export default NavigationBar;

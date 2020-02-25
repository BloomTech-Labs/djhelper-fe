import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../actions/action';
import {Link} from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button
} from 'reactstrap';


const NavigationBar = (props) => {
    const tokenPresent = useSelector(state => state.userReducer.tokenPresent);

    const dispatch = useDispatch();

    const handleLogout = () => {
      console.log('time to logout');
      dispatch(logoutUser());
    }

    return (
        <Navbar className="navBar" data-testid="navBar" dark expand="md">
            <NavbarBrand className="navElements" href="/">DJ Helper</NavbarBrand>
              <Nav className=" navElements" navbar>
                <NavItem>
                  <NavLink href="/register">Register</NavLink>
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

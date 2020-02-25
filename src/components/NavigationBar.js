import React from "react";
import { useSelector } from "react-redux";
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
                        ? <NavLink  onClick={props.handleLogout}>Logout</NavLink>
                        : <NavLink href="/login">Login</NavLink>
                    }
                </NavItem>
         </Nav>
        </Navbar>
    )
}


export default NavigationBar;

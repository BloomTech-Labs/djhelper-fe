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
        <Navbar data-testid="navBar" color="dark" dark expand="md">
            <NavbarBrand href="/">DJ Helper</NavbarBrand>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/Lambda-School-Labs/djhelper-fe">GitHub</NavLink>
                </NavItem>
             </Nav>
            {tokenPresent
                ? <Button  onClick={props.handleLogout}>Logout</Button>
                : <Link to="/login"><Button>Login</Button></Link>
            }
        </Navbar>
    )
}


export default NavigationBar;

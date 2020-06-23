import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { logoutUser } from '../actions/action';
import Modal from 'react-modal';
import { Input } from 'reactstrap'
import LoginModal from "./LoginModal"
// import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { loginUser } from '../actions/action';
import Login from "./Login"
import reactstrap from "reactstrap"
  

 

  

const NavigationBar = props => {
  
  const tokenPresent = useSelector(state => state.userReducer.tokenPresent);
  const token = localStorage.token;

  let home;
  let djProfile;
   const [modalIsOpen, setIsOpen]=useState(false)
   const [userInfo, setUserInfo] = useState({
    username: '',
    password: ''
  });
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

<<<<<<< Updated upstream
  const selectedIcon = () => {
    const url = window.location.pathname;
    if (url === '/dj') {
      home = 'selected';
      djProfile = '';
    } else {
      home = '';
      djProfile = 'selected';
    }
  };
=======


  // const selectedIcon = () => {
  //   const url = window.location.pathname;
  //   if (url === '/dj') {
  //     home = 'selected';
  //     djProfile = '';
  //   } else {
  //     home = '';
  //     djProfile = 'selected';
  //   }
  // };
  const openModal=()=>{
    setIsOpen(true)
  }
  const closeModal=()=>{
    setIsOpen(false)
  }
  
  

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(userInfo, props.history));
  };
  const handleChange = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  
  
>>>>>>> Stashed changes

  const navState = () => {
    if (tokenPresent || props.tokenPresent) {
      return (
        <Nav className="navElementsIcons" navbar>
          {selectedIcon()}
          <NavItem id="profile">
            <NavLink
              to="/dj/profile"
              className={djProfile}
              data-testid="profile"
            >
              <FontAwesomeIcon icon="user" size="2x" />
            </NavLink>
          </NavItem>
          <NavItem id="home">
            <NavLink id="home" className={home} data-testid="home" to="/dj">
              <FontAwesomeIcon icon="home" size="2x" />
            </NavLink>
          </NavItem>

          <NavItem className="links">
            <NavLink to="/about">About</NavLink>
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
          <button className="button-signup" onClick={openModal}>SignIn</button>
          <Modal isOpen={modalIsOpen}
          onRequestClose={closeModal}
            >
          <Login/>
          
          {/* <h1> Welcome </h1>
           
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
              placeholder="password"
            />
             </div> */}
             {/* <button onClick={handleSubmit}>Log In</button> */}
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
          <NavLink to="/home">Home</NavLink>
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
        <NavbarBrand href={token ? '/dj' : '/'}>DJ Helper</NavbarBrand>
        {staticMenu()}
      </div>
      {navState()}
    </Navbar>
  );
  };

export default NavigationBar;

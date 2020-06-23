import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavigationBar from './NavigationBar';

import Phone2 from '../images/Phone-2.png';

const Home = props => {
  const name = useSelector(state => state.userReducer.name);
  const tokenPresent = useSelector(state => state.userReducer.tokenPresent);
  
  return (
    <div className="home-page">
      <NavigationBar tokenPresent={tokenPresent} />

      <header className="header">
        <section className="header__left">
          <h1>The top-requested tracks at your fingertips.</h1>
          <div className="header__left-subSection">
            <button className="btn-fancy" type="button">
              Start Today Free
            </button>
            <a href="/#" className="btn-inline u-margin-left-medium">
              Learn more about DJ Helper &#62;
            </a>
          </div>
        </section>
        <section className="header__right">
          <img src={Phone2} alt="" />
        </section>
      </header>

      
    </div>
  );
};

export default Home;

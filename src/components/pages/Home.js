import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavigationBar from '../NavigationBar';
import dancing from '../../images/dancing.png';
import headphone from '../../images/headphone dude.png';

import group2 from '../../images/group 2.png';

import Phone2 from '../../images/Phone-2.png';

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
      <div className="beheard">
        <h1>Be Heard</h1>
      </div>
      <section className="bottom-imgs">
        <div className="img1">
          <img src={dancing} alt="dancing" />
          <p>Share your mix with guests </p>
        </div>
        <div className="img2">
          <img src={headphone} alt="headphone" />
          <p>Send request &amp vote on what gets played next </p>
        </div>
        <div className="img3">
          <img src={group2} alt="group_pic" />
          <p>Save and share your favorite mixes </p>
        </div>
      </section>
      <section>
        <div className="bottom-mid">
          <h1>Let the music speak for itself</h1>
          <p>Start taking requests</p>
          <button >Start Today Free</button>
        </div>
      </section>
      <section>
        <div className="footer1">
        2020 DJ-Helper all rights reserved</div>
       <div className="footer2"> 
       <p>Home</p>
       <p>IPA Libaray</p>
       <p>Contact</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

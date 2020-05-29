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
              Lear more about DJ Helper &#62;
            </a>
          </div>
        </section>
        <section className="header__right">
          <img src={Phone2} alt="" />
        </section>
      </header>

      {/* <div className="main-content">
        {!name && (
          <>
            <h2>Welcome!</h2>
            <h3>
              Please
              <Link to="/register"> register</Link> or
              <Link to="/login"> log in </Link>
              to continue.
            </h3>
          </>
        )}
        {name && <h2>Welcome,{name}!</h2>}
      </div> */}
    </div>
  );
};

export default Home;

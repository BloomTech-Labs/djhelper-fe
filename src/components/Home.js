import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavigationBar from './NavigationBar';

const Home = props => {
  const name = useSelector(state => state.userReducer.name);
  const tokenPresent = useSelector(state => state.userReducer.tokenPresent);

  return (
    <div className="home-page">
      <div className="header">
        <NavigationBar tokenPresent={tokenPresent} />
        <h1>DJ Helper</h1>
        <h2>How DJs easily collect song requests</h2>
        <h2>And everyone upvotes the songs they also want to hear!</h2>
      </div>

      <div className="main-content">
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
      </div>
    </div>
  );
};

export default Home;

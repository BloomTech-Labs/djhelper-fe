import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavigationBar from './NavigationBar';

const Home = props => {
  const name = useSelector(state => state.userReducer.name);

  return (
    <div>
      <NavigationBar />
      {!name && (
        <h2>
          Welcome! Please <Link to="/register">register</Link> or{' '}
          <Link to="/login">log in</Link> to continue.
        </h2>
      )}
      {name && <h2>Welcome, {name}!</h2>}
    </div>
  );
};

export default Home;

import React from "react";
import { useSelector } from 'react-redux';

const Home = (props) => {
  const name = useSelector(state => state.userReducer.name);

    return (
        <div>
          {!name && <h2>Welcome! Please <a href='/register'>register</a> or <a href='/login'>log in</a> to continue.</h2>}
          {name && <h2>Welcome, {name}!</h2>}
        </div>
    )
}

export default Home;

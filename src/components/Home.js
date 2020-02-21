import React from "react";
import {Link} from "react-router-dom";
const Home = (props) => {

    return (
        <div>
          {!props.user && <h2>Welcome! Please <Link to='/register'>register</Link> or <Link to='/login'>log in</Link> to continue.</h2>}
          {props.user && <h2>Welcome, {props.user.name}!</h2>}
        </div>
    )
}

export default Home;

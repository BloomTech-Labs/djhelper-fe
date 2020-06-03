import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const tokenPresent = useSelector(state => state.userReducer.tokenPresent);
  const token = localStorage.token;
  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;

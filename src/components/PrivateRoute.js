import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, token, ...rest }) => {
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

const mapStateToProps = state => {
  return {
    token: state.userReducer.tokenPresent
  };
};

export default connect(mapStateToProps)(PrivateRoute);

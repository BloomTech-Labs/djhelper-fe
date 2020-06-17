/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const DashboardWelcome = props => {
  return (
    <div className="welcome">
      <h1 data-testid="header"> Welcome back, {props.name}!</h1>
    </div>
  );
};

export default DashboardWelcome;

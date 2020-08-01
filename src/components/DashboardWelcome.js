/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import dashboard from '../images/dashboard.png';

const DashboardWelcome = ({ name }) => {
  return (
    <>
      <div>
        <img className="dashboardimage" src={dashboard} alt="dashboardimage" />

        <h1 data-testid="header" className="dashboard-welcome">
          {`Welcome back,${name}!`}
        </h1>

        <h1 className="dashboard-welcome-event"> Event Playlist</h1>
      </div>
    </>
  );
};

export default DashboardWelcome;

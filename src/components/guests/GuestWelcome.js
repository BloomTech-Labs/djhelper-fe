import React from 'react';
import GuestWelcomeImage from "../../images/guestwelcome.png"
import GuestPage from "./GuestPage"
const GuestWelcome = ({ name }) => {
  return (
    <>
      <div>
        <img className="guestWelcomeImage" src={GuestWelcomeImage} alt="guestWelcomeImage" />

        <h1 className="guest-welcome">
          {`Welcome back, Guest!`}
        </h1>

        <h1 className="guest-welcome-event"> Your Invites </h1>
      </div>
      <GuestPage/>
    </>
  );
};

export default GuestWelcome;

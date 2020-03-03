import React from 'react';


const DashboardWelcome = (props) => {

    return (
        <div className="welcome">
            <h1> Welcome, {props.name}!</h1>
        </div>

    )
}

export default DashboardWelcome;

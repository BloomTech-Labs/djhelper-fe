import React from 'react';
import { useSelector } from 'react-redux';


const Dashboard = () => {
    const name = useSelector(state => state.userReducer.name);
    const username = useSelector(state => state.userReducer.username);
    const email = useSelector(state => state.userReducer.email);
    const phone = useSelector(state => state.userReducer.phone);
    const website = useSelector(state => state.userReducer.website);

    return (
        <div className="dashboard">
            <h1> Dashboard</h1>
            <div className="welcome">
                {name
                    ? <p>Welcome, {name}!</p>
                    : <p> Oops, looks like you don't have a name!</p>
                }
                <p><span>Add Event and Event List coming soon!</span></p>
            </div>
            <div className="board">
                <div>
                    <h2>Profile:</h2>
                    {name && <h3>{name}</h3>}
                    {username && <p>Username: {username}</p>}
                    {email && <p>Email: {email}</p>}
                    {phone && <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>}
                    {website && <p>Website: <a href={website}>{website}</a></p>}
                </div>
            </div>
            <div className="board">
                <div>
                    <p>Events:</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

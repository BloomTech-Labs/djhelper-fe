import React from 'react';
import { useSelector } from 'react-redux';
//import Image from 'react-bootstrap/Image';


const Dashboard = () => {
    const name = useSelector(state => state.userReducer.name);
    const username = useSelector(state => state.userReducer.username);
    const email = useSelector(state => state.userReducer.email);
    const phone = useSelector(state => state.userReducer.phone);
    const website = useSelector(state => state.userReducer.website);
    const bio = useSelector(state => state.userReducer.bio);
    const profile_pic_url = useSelector(state => state.userReducer.profile_pic_url);

    return (
        <div className="dashboard">
            <h1> Dashboard</h1>
            <div className="welcome">
                {name
                    ? <p>Welcome, {name}!</p>
                    : <p>Welcome</p>
                }
                
            </div>
            <div className="board">
                <div>
                    <h2>Profile:</h2>
                    {name && <h3>{name}</h3>}
                    {bio && <p><span>{bio}</span></p>}
                    {username && <p>Username: {username}</p>}
                    {email && <p>Email: {email}</p>}
                    {phone && <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>}
                    {website && <p>Website: <a href={website}>{website}</a></p>}
                    {profile_pic_url && <div className='img-container'><img src={profile_pic_url} alt={name} /></div>}
                </div>
            </div>
            <div className="board">
                <div>
                    <h2>Events:</h2>
                    <p><span>Add Event and Event List coming soon!</span></p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

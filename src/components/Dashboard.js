import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import NavigationBar from './NavigationBar';
//import Image from 'react-bootstrap/Image';

import { deleteUser, startEditUser } from '../actions/action';
import EditDJ from './EditDJ';


const Dashboard = () => {

    const dispatch = useDispatch();

    const name = useSelector(state => state.userReducer.name);
    const username = useSelector(state => state.userReducer.username);
    const email = useSelector(state => state.userReducer.email);
    const phone = useSelector(state => state.userReducer.phone);
    const website = useSelector(state => state.userReducer.website);
    const bio = useSelector(state => state.userReducer.bio);
    const profile_pic_url = useSelector(state => state.userReducer.profile_pic_url);
    const id = useSelector(state => state.userReducer.id);
    const editUserStart = useSelector(state => state.userReducer.editUserStart);

    const handleDelete = () => {
        dispatch(deleteUser(id));
    }

    const startEdit = () => {
        console.log('time to edit dj user info');
        dispatch(startEditUser());
    }
        /*
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

            <div>
                <Button className="btn-secondary" onClick={startEdit}>Edit DJ Info</Button>
                <Button className="btn-danger" onClick={handleDelete}>Delete DJ Account</Button>
            </div>

            {editUserStart &&
                <div>
                    <EditDJ />
                </div>
            }

            <div className="board">
                <div>
                    <h2>Events:</h2>
                    <p><span>Add Event and Event List coming soon!</span></p>
                </div>
            </div>
            */

    return (
        <div className="dashboard">
        <NavigationBar />
        <div className="preview-event-details">
            <div className="event-description">
                <p> Event description goes here</p>
            </div>
            <div className="newest-song-requests">
                <p> List of newest song requests goes here</p>
            </div>
            <div className="genre-graph">
                <p> Genre graph goes here</p>
            </div>
        </div>
        <div className="upcoming-events">
        <h6> Upcoming Events</h6>
        </div>
        <div className="past-events">
            <h6> Past Events</h6>
        </div>
        </div>
    )
}

export default Dashboard;

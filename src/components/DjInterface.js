import React from 'react';
import { useSelector } from 'react-redux';

const DjInterface = props => {
    const name = useSelector(state => state.userReducer.name);
    const username = useSelector(state => state.userReducer.username);
    const email = useSelector(state => state.userReducer.email);
    const phone = useSelector(state => state.userReducer.phone);
    const website = useSelector(state => state.userReducer.website);

    return (

        <div>
            <h2>DJ Interface</h2>
            <div className='dj-interface'>
                {name && <h3>{name}</h3>}
                {username && <p>{username}</p>}
                {email && <p>{email}</p>}
                {phone && <p>{phone}</p>}
                {website &&  <p>{website}</p>}
            </div>

            <p><span>Add Event and Event List coming soon!</span></p>

        </div>
    )
}

export default DjInterface;

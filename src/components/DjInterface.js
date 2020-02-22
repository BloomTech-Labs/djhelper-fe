import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const DjInterface = props => {
    const name = useSelector(state => state.userReducer.name);
    const username = useSelector(state => state.userReducer.username);
    const [phone] = localStorage.getItem('phone') || '';
    const [website] = localStorage.getItem('website') || '';

    //TODO: Add display of website and phone, especially once we have our own backend.
    /*
    {phone && <p>{phone}</p>}
    {website &&  <p>{website}</p>}
    */

    return (
        
        <div className='dj-interface'>
            <h2>DJ Interface</h2>
            {name && <h3>{name}</h3>}
            {username && <p>{username}</p>}
            
            <p><span>Add Event and Event List coming soon!</span></p>
            
        </div>
    )
}

export default DjInterface;
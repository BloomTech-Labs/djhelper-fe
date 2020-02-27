import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DJProfile = props => {
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

    return (
        <div>
            <div className='image-side'>
                <div className='image-container'>
                    <img src={profile_pic_url} alt='dj profile' />
                </div>
                <button onClick={dispatch(editUserStart)}>Edit</button>
            </div>

            <div className='text-side'>
                <h1>{username}</h1>

                <p>{bio}</p>

                <h3>Name</h3>
                <p>{name}</p>

                <h3>Email</h3>
                <p><a href={`mailto:${email}`}>{email}</a></p>

                <h3>Website</h3>
                <p><a href={website}>{website}</a></p>

                <h3>Phone</h3>
                <p><a href={`tel:${phone}`}>{phone}</a></p>

            </div>

            
        </div>
    )
}

export default DJProfile;
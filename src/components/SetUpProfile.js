import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, cancelEditUser } from '../actions/action';

const SetUpProfile = props => {
    const dispatch = useDispatch();

    const name = useSelector(state => state.userReducer.name) || 'DJ';
    const username = useSelector(state => state.userReducer.username);
    const email = useSelector(state => state.userReducer.email);
    const phone = useSelector(state => state.userReducer.phone);
    const website = useSelector(state => state.userReducer.website);
    const bio = useSelector(state => state.userReducer.bio);
    const profile_pic_url = useSelector(state => state.userReducer.profile_pic_url);
    const id = useSelector(state => state.userReducer.id);
    const editUserProcessing = useSelector(state => state.userReducer.editUserProcessing);

    const [userInput, setUserInput] = useState({website: '', phone: '', profile_pic_url: '', bio: ''});

    const handleChange = e => {
            setUserInput({...userInput, [e.target.name]: e.target.value});
    }

    return (
        <div className='setup-page'>
        <div className='side left-side'>
            <div className='check-container'>
                <FontAwesomeIcon icon={faCheck} />
            </div>
            <h2>Welcome, {name}!</h2>
            <p>Let's get your profile set up.</p>
        </div>
        <div className='side right-side'>
            <div className='img-area'>
                <div className='plus-area'>
                    <FontAwesomeIcon icon={faPlus} />
                </div>

            </div>
            <form>
                <div className='input-group'>
                    <label htmlFor='website'>Website</label>
                    <input name='website' type='url' id='website' onChange={handleChange}/>
                </div>

                <div className='input-group'>
                    <label htmlFor='phone'>Phone</label>
                    <input name='phone' type='phone' id='phone' onChange={handleChange}/>
                </div>

                <div className='input-group'>
                    <label htmlFor='bio'>Bio</label>
                    <textarea name='bio' type='text' id='bio' onChange={handleChange}/>
                </div>

                <div className='button-area'>
                    <button type='submit'>Submit</button>
                    <button className='skip'>Skip</button>
                </div>

            </form>
            </div>
        </div>
    )
}

export default SetUpProfile;
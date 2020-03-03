import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../actions/action';
import { validUrl } from '../utils/validUrl';
import Loader from 'react-loader-spinner';

const SetUpProfile = props => {
    const dispatch = useDispatch();

    const name = useSelector(state => state.userReducer.name) || 'DJ';
    const id = useSelector(state => state.userReducer.id);
    const editUserStart = useSelector(state => state.userReducer.editUserStart);

    const [userInput, setUserInput] = useState({website: '', phone: '', profile_pic_url: '', bio: ''});
    const [wantsToChangeImg, setWantsToChangeImg] = useState(false);

    const profilePic = useRef();

    const handleChange = e => {
            setUserInput({...userInput, [e.target.name]: e.target.value});
    }

    const handleCancel = () => {
        props.history.push('/dj');
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(userInput);
        let infoNeeded = {};

        if (userInput.phone.length > 0) {
            infoNeeded.phone = userInput.phone;
        }
        if (userInput.profile_pic_url.length > 0) {
            infoNeeded.profile_pic_url = userInput.profile_pic_url;
        }
        if (userInput.bio.length > 0) {
            infoNeeded.bio = userInput.bio;
        }

        if (userInput.website.length > 0) {
            infoNeeded.website = userInput.website;
        }
        
        console.log("id: ", id);
        console.log("infoNeeded: ", infoNeeded);
        dispatch(updateUser(props.history, id, infoNeeded));
    }

    useEffect(()=> {
        //console.log(userInput.profile_pic_url);
        //console.log(validUrl(userInput.profile_pic_url));
        if (validUrl(userInput.profile_pic_url)) {
            profilePic.current.style['background-image'] = `url(${userInput.profile_pic_url})`;
            profilePic.current.style['background-size'] = 'cover';
            profilePic.current.style['background-repeat'] = 'no-repeat';
        }
    }, [userInput.profile_pic_url]);

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
            {editUserStart && <div className='loader'>
                    <Loader type="Audio" color="purple" height={200} width={200} />
                </div>
            }
             
            {!editUserStart &&
            <div className='img-area' ref={profilePic}>
                <div className='plus-area' onClick={() => setWantsToChangeImg(!wantsToChangeImg)}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
            }

            
            <form onSubmit={handleSubmit}>
                {wantsToChangeImg &&
                    <div className='input-group'>
                        <label htmlFor='profile_pic_url'>Link to Profile Image</label>
                        <input name='profile_pic_url' 
                            type='text' 
                            id='profile_pic_url' 
                            onChange={handleChange}
                            value={userInput.profile_pic_url}/>
                    </div>
                }

                <div className='input-group'>
                    <label htmlFor='website'>Website</label>
                    <input name='website' type='url' id='website' onChange={handleChange} value={userInput.website}/>
                </div>

                <div className='input-group'>
                    <label htmlFor='phone'>Phone</label>
                    <input name='phone' type='phone' id='phone' onChange={handleChange} value={userInput.phone}/>
                </div>

                <div className='input-group'>
                    <label htmlFor='bio'>Bio</label>
                    <textarea name='bio' type='text' id='bio' onChange={handleChange} value={userInput.value}/>
                </div>

                <div className='button-area'>
                    <button type='submit'>Submit</button>
                    <button className='skip' onClick={handleCancel}>Skip</button>
                </div>

            </form>
            </div>
        
        </div>
    )
}

export default SetUpProfile;
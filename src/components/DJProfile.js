import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startEditUser } from '../actions/action';

import EditDJ from './EditDJ';
import NavigationBar from './NavigationBar';

import DJMixer from '../images/DJMixer.jpg';

const DJProfile = props => {
    const dispatch = useDispatch();
    const name = useSelector(state => state.userReducer.name);
    const username = useSelector(state => state.userReducer.username);
    const email = useSelector(state => state.userReducer.email);
    const phone = useSelector(state => state.userReducer.phone);
    const website = useSelector(state => state.userReducer.website);
    const bio = useSelector(state => state.userReducer.bio);
    const profile_pic_url = useSelector(state => state.userReducer.profile_pic_url);
    const editUserStart = useSelector(state => state.userReducer.editUserStart);

    const [profileImg, setProfileImg] = useState(DJMixer);

    const profile = useRef();

    useEffect(() => {
        if (profile_pic_url && profile_pic_url.length > 0) {
            setProfileImg(profile_pic_url);
        }
    }, [profile_pic_url])

    const handleOrientation = () => {
        let height = profile.current.naturalHeight;
        let width = profile.current.naturalWidth;
        let orientation = (height > width)? 'portrait': 'landscape';
        //console.log('width: ', width, '. Height: ', height, '. Orientation: ', orientation);
        if (orientation === 'landscape') {
            profile.current.classList.add('landscape');
        } else {
            profile.current.classList.remove('landscape');
        }   
    }
    
    return (
        <div className='dj-profile-page'>
            <NavigationBar />
            <div className='main-content'>
                <div className='side image-side'>
                    <div className='image-container'>
                        <img src={profileImg} alt='dj profile' ref={profile} onLoad={handleOrientation}/>
                    </div>
                    <button>Edit</button>
                </div>

                <div className='side text-side'>
                    <div>
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
            </div>

            
        </div>
    )
}

export default DJProfile;

/*
//To add:

                {editUserStart &&
                <EditDJ />
                }
*/
/* eslint-disable camelcase */
import React, { useState, useRef, useEffect } from 'react';
import { Form, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { editUser, cancelEditUser, deleteUser } from '../actions/action';

import DJMixer from '../images/DJMixer.jpg';

const EditDJ = () => {
  const dispatch = useDispatch();

  const name = useSelector(state => state.userReducer.name);
  const email = useSelector(state => state.userReducer.email);
  const phone = useSelector(state => state.userReducer.phone);
  const website = useSelector(state => state.userReducer.website);
  const bio = useSelector(state => state.userReducer.bio);
  const profile_pic_url = useSelector(
    state => state.userReducer.profile_pic_url
  );
  const id = useSelector(state => state.userReducer.id);
  const editUserProcessing = useSelector(
    state => state.userReducer.editUserProcessing
  );

  const [profileImg, setProfileImg] = useState(DJMixer);
  const profile = useRef();
  const [wantsToChangeImg, setWantsToChangeImg] = useState(false);

  useEffect(() => {
    if (profile_pic_url && profile_pic_url.length > 0) {
      setProfileImg(profile_pic_url);
    }
  }, [profile_pic_url]);

  const handleOrientation = () => {
    const height = profile.current.naturalHeight;
    const width = profile.current.naturalWidth;
    const orientation = height > width ? 'portrait' : 'landscape';
    if (orientation === 'landscape') {
      profile.current.classList.add('landscape');
    } else {
      profile.current.classList.remove('landscape');
    }
  };

  const [userInfo, setUserInfo] = useState({
    name,
    email,
    website,
    phone,
    bio,
    profile_pic_url,
    id
  });

  const [toggleDelete, setToggleDelete] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(userInfo);
    const infoNeeded = {};

    if (userInfo.name.length > 0) {
      infoNeeded.name = userInfo.name;
    }
    if (userInfo.email.length > 0) {
      infoNeeded.email = userInfo.email;
    }
    if (userInfo.phone.length > 0) {
      infoNeeded.phone = userInfo.phone;
    }
    if (userInfo.profile_pic_url.length > 0) {
      infoNeeded.profile_pic_url = userInfo.profile_pic_url;
    }
    if (userInfo.bio.length > 0) {
      infoNeeded.bio = userInfo.bio;
    }

    if (userInfo.website.length > 0) {
      infoNeeded.website = userInfo.website;
    }

    dispatch(editUser(id, infoNeeded));
  };

  const handleChange = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    dispatch(cancelEditUser());
  };

  const handleDeleteToggle = () => {
    setToggleDelete(!toggleDelete);
  };

  const handleDelete = () => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="main-content">
      <div className="image-side">
        <div className="image-container">
          <img
            src={profileImg}
            alt="dj profile"
            ref={profile}
            onLoad={handleOrientation}
          />
          <span
            className="edit-icon"
            onClick={() => setWantsToChangeImg(!wantsToChangeImg)}
          >
            <FontAwesomeIcon icon="pencil-alt" size="2x" />
          </span>
        </div>
        <button onClick={handleSubmit} className="save" type="button">
          Save
        </button>
        <button onClick={handleCancel} className="cancel" type="button">
          Cancel
        </button>
        {!toggleDelete && (
          <button onClick={handleDeleteToggle} className="delete" type="button">
            Delete Profile
          </button>
        )}
        {toggleDelete && (
          <>
            <p className="confirm-delete">
              Are you 100% sure that you want to delete your account?
            </p>
            <button
              type="button"
              className="confirm-delete"
              onClick={handleDelete}
            >
              Yes, delete my account.
            </button>
            <button
              type="button"
              className="cancel-delete"
              onClick={handleDeleteToggle}
            >
              No, go ahead and keep my account.
            </button>
          </>
        )}
      </div>

      <div className="text-side form-width">
        {editUserProcessing && (
          <div className="loader">
            <Loader type="Audio" color="purple" height={200} width={200} />
          </div>
        )}

        {!editUserProcessing && (
          <Form onSubmit={handleSubmit}>
            {wantsToChangeImg && (
              <div>
                <label htmlFor="profile_pic_url">Link to Profile Image</label>
                <Input
                  name="profile_pic_url"
                  type="text"
                  id="profile_pic_url"
                  onChange={handleChange}
                  value={userInfo.profile_pic_url}
                />
              </div>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <Input
                name="name"
                type="text"
                id="name"
                onChange={handleChange}
                value={userInfo.name}
              />
            </div>

            <div>
              <label htmlFor="bio">Bio</label>
              <Input
                name="bio"
                type="text"
                id="bio"
                onChange={handleChange}
                value={userInfo.bio}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Input
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                value={userInfo.email}
              />
            </div>
            <div>
              <label htmlFor="website">Your Website URL</label>
              <Input
                name="website"
                type="url"
                id="website"
                onChange={handleChange}
                value={userInfo.website}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <Input
                name="phone"
                type="phone"
                id="phone"
                onChange={handleChange}
                value={userInfo.phone}
              />
            </div>

            <div>
              <label htmlFor="profile_pic_url">Link to Profile Image</label>
              <Input
                name="profile_pic_url"
                type="text"
                id="profile_pic_url"
                onChange={handleChange}
                value={userInfo.profile_pic_url}
              />
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default EditDJ;

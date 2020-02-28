import React, {useState} from 'react';
import {Form, Input} from "reactstrap";
import { useSelector, useDispatch } from 'react-redux';
//import Loader from 'react-loader-spinner';

import { editUser } from '../actions/action';

const EditDJ = (props) => {

    const dispatch = useDispatch();

    const name = useSelector(state => state.userReducer.name);
    const username = useSelector(state => state.userReducer.username);
    const email = useSelector(state => state.userReducer.email);
    const phone = useSelector(state => state.userReducer.phone);
    const website = useSelector(state => state.userReducer.website);
    const bio = useSelector(state => state.userReducer.bio);
    const profile_pic_url = useSelector(state => state.userReducer.profile_pic_url);
    const id = useSelector(state => state.userReducer.id);

    const [userInfo, setUserInfo] = useState({
        username: username,
        //password: '',
        //repassword: '',
        name: name,
        email: email,
        website: website,
        phone: phone,
        bio: bio,
        profile_pic_url: profile_pic_url,
        id: id
    });

    const handleSubmit = e => {
        e.preventDefault();
        console.log(userInfo);
        let infoNeeded = {};

        if (userInfo.username.length > 0) {
            infoNeeded.username = userInfo.username;
        }
        //TODO: Add ability to change password when backend is setup to do so
        /*
        if (userInfo.password.length > 0) {
            infoNeeded.password = userInfo.password;
        }
        */
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
        
        console.log("id: ", id);
        dispatch(editUser(id, infoNeeded));
    }

    const handleChange = e => {
        setUserInfo({...userInfo, [e.target.name]:e.target.value});
    }
    /*
    const passwordValidation = () => {
        if (userInfo.password.length >= 1) {
            if (userInfo.password.length >= 8) {
                return <Input valid name='password' type='password' id='password' onChange={handleChange}/>
            } else {
                return <Input invalid name='password' type='password' id='password' onChange={handleChange}/>
            }
        }
        return <Input name='password' type='password' id='password' onChange={handleChange}/>
    }

    const repasswordValidation = () => {
        if (userInfo.repassword.length >= 1) {
            if (userInfo.password === userInfo.repassword) {
                return (<Input valid name='repassword' type='password' id='repassword' onChange={handleChange}/>)
            } else {
                return (<Input invalid name='repassword' type='password' id='repassword' onChange={handleChange}/>)
            }
        }
        return (<Input name='repassword' type='password' id='repassword' onChange={handleChange}/>)
    }
    */

    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <legend>Update DJ Info</legend>
                <hr/>
                <div>
                    <label htmlFor='username'>Username</label>
                    <Input name='username' 
                        type='text' 
                        id='username'  
                        onChange={handleChange}
                        value={userInfo.username}/>
                </div>
                {
                /*
                <div>
                    <label htmlFor='password'>New Password</label>
                    {passwordValidation()}
                </div>
                <div>
                    <label htmlFor='repassword'>Re-Enter New Password</label>
                    {repasswordValidation()}
                </div>
                */
                }
                <div>
                    <label htmlFor='name'>Name</label>
                    <Input name='name' 
                        type='text' 
                        id='name' 
                        onChange={handleChange}
                        value={userInfo.name}/>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input name='email' 
                        type='email' 
                        id='email' 
                        onChange={handleChange}
                        value={userInfo.email}/>
                </div>
                <div>
                    <label htmlFor='website'>Your Website URL</label>
                    <Input name='website' 
                        type='url' 
                        id='website' 
                        onChange={handleChange}
                        value={userInfo.website}/>
                </div>
                <div>
                    <label htmlFor='phone'>Phone Number</label>
                    <Input name='phone' 
                        type='phone' 
                        id='phone' 
                        onChange={handleChange}
                        value={userInfo.phone}/>
                </div>
                <div>
                    <label htmlFor='bio'>Bio</label>
                    <Input name='bio' 
                        type='text' 
                        id='bio' 
                        onChange={handleChange}
                        value={userInfo.bio}/>
                </div>
                <div>
                    <label htmlFor='profile_pic_url'>Link to Profile Image</label>
                    <Input name='profile_pic_url' 
                        type='text' 
                        id='profile_pic_url' 
                        onChange={handleChange}
                        value={userInfo.profile_pic_url}/>
                </div>
                <button type='submit'>Submit</button>
            </Form>
        </div>
    )
}

export default EditDJ;

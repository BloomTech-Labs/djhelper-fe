import React, {useState} from 'react';
import {Form, Input} from "reactstrap";

const Register = (props) => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        repassword: '',
        name: '',
        email: '',
        website: '',
        phone: '',
        bio: '',
        profile_pic_url: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        console.log(userInfo);
        props.registerUser(userInfo, props.history);
        setUserInfo({
            username: '',
            password: '',
            repassword: '',
            name: '',
            email: '',
            website: '',
            phone: '',
            bio: '',
            profile_pic_url: ''
        })
    }

    const handleChange = e => {
        setUserInfo({...userInfo, [e.target.name]:e.target.value});
    }

    const passwordValidation = () => {
        if (userInfo.repassword.length >= 1) {
            if (userInfo.password === userInfo.repassword) {
                return (<Input valid name='repassword' type='password' id='repassword' required onChange={handleChange}/>)
            } else {
                return (<Input invalid name='repassword' type='password' id='repassword' required onChange={handleChange}/>)
            }
        }
        return (<Input name='repassword' type='password' id='repassword' required onChange={handleChange}/>)

    }

    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <legend>Register</legend>
                <hr/>
                <div>
                    <label htmlFor='username'>Username</label>
                    <Input name='username' type='text' id='username' required onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    {userInfo.password.length >= 1
                        ? <Input valid name='password' type='password' id='password' required onChange={handleChange}/>
                        : <Input name='password' type='password' id='password' required onChange={handleChange}/>
                    }
                </div>
                <div>
                    <label htmlFor='repassword'>Re-Enter Password</label>
                    {passwordValidation()}
                </div>
                <div>
                    <label htmlFor='name'>Name</label>
                    <Input name='name' type='text' id='name' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input name='email' type='email' id='email' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='website'>Your Website URL</label>
                    <Input name='website' type='url' id='website' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='phone'>Phone Number</label>
                    <Input name='phone' type='phone' id='phone' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='bio'>Bio</label>
                    <Input name='bio' type='text' id='bio' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='profile_pic_url'>Link to Profile Image</label>
                    <Input name='profile_pic_url' type='text' id='profile_pic_url' onChange={handleChange}/>
                </div>
                <button type='submit'>Submit</button>
            </Form>
        </div>
    )
}

export default Register;

import React, {useState} from 'react';
import {Form, Input, Button} from "reactstrap";
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';

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

    const [displayMore, setDisplayMore] = useState(false);

    const isRegistering = useSelector(state => state.userReducer.registerUserStart);

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
        if (userInfo.password.length >= 1) {
            if (userInfo.password.length >= 8) {
                return <Input valid name='password' type='password' id='password' required onChange={handleChange}/>
            } else {
                return <Input invalid name='password' type='password' id='password' required onChange={handleChange}/>
            }
        }
        return <Input name='password' type='password' id='password' required onChange={handleChange}/>
    }

    const repasswordValidation = () => {
        if (userInfo.repassword.length >= 1) {
            if (userInfo.password === userInfo.repassword) {
                return (<Input valid name='repassword' type='password' id='repassword' required onChange={handleChange}/>)
            } else {
                return (<Input invalid name='repassword' type='password' id='repassword' required onChange={handleChange}/>)
            }
        }
        return (<Input name='repassword' type='password' id='repassword' required onChange={handleChange}/>)

    }

    const triggerDisplayMore = () => {
        setDisplayMore(!displayMore);
    }

    return(
        <div className='registration-page'>
        <NavigationBar />
            <div className='registration-page-block'>
                <h1>
                    Know what your audience wants.
                </h1>
            </div>

            <div className='registration-page-block'>
            {isRegistering &&
                <div className='loader'>
                    <Loader type="Audio" color="purple" height={200} width={200} />
                </div>
            }

            {!isRegistering &&

                <Form data-testid='registerForm' onSubmit={handleSubmit}>
                    <legend>Register</legend>
                    <hr/>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <Input name='name' type='text' id='name' required onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <Input name='email' type='email' id='email' onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <Input name='username' type='text' id='username' required onChange={handleChange}/>
                    </div>
                    <div className='password-area'>
                        <div>
                            <label htmlFor='password'>Password</label>
                            {passwordValidation()}
                        </div>
                        <div>
                            <label htmlFor='repassword'>Confirm Password</label>
                            {repasswordValidation()}
                        </div>
                    </div>

                    <button type='submit'>Submit</button>

                    <p>Already have an account? <span className='bold-text'><Link data-testid="toLogin" to='/login'>Login here</Link></span>.</p>
                </Form>

            }
            </div>
        </div>
    )
}

export default Register;

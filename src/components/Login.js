import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import { loginUser } from '../actions/action';

const Login = (props) => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
    });

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        console.log(userInfo);
        //props.loginUser(userInfo, props.history);
        dispatch(loginUser(userInfo, props.history));
    }

    const handleChange = e => {
        setUserInfo({...userInfo, [e.target.name]:e.target.value});
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <legend>Login</legend>
                <hr/>
                <div>
                    <label htmlFor='username'>Username / Email</label>
                    <input name='username' type='text' id='username' required onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input name='password' type='password' id='password' required onChange={handleChange}/>
                </div>

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Login;

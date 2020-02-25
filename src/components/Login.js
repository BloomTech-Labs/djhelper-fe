import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { loginUser } from '../actions/action';

const Login = (props) => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
    });

    const isLoggingIn = useSelector(state => state.userReducer.loginUserStart);

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
        <div className='login-page'>
            {isLoggingIn &&
                <div className='loader'>
                    <Loader type="Audio" color="purple" height={200} width={200} />
                </div>
            }

            {!isLoggingIn &&
                <form onSubmit={handleSubmit}>
                    <legend>Welcome back!</legend>
                    <hr/>
                    <div>
                        <label htmlFor='username'>Username: </label>
                        <input name='username' type='text' id='username' required onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password: </label>
                        <input name='password' type='password' id='password' required onChange={handleChange}/>
                    </div>

                    <button type='submit'>Submit</button>

                    <p>Don't have an account yet? Register <Link to='/register'>here!</Link></p>
                </form>
            }
        </div>
    )
}

export default Login;

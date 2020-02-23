import React, {useState} from 'react';

const Register = (props) => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        repassword: '',
        name: '',
        email: '',
        website: '',
        phone: ''
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
            phone: ''
        })
    }

    const handleChange = e => {
        setUserInfo({...userInfo, [e.target.name]:e.target.value});
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <legend>Register</legend>
                <hr/>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input name='username' type='text' id='username' required onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input name='password' type='password' id='password' required onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='repassword'>Re-Enter Password</label>
                    <input name='repassword' type='password' id='repassword' required onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input name='name' type='text' id='name' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input name='email' type='email' id='email' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='website'>Your Website URL</label>
                    <input name='website' type='url' id='website' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='phone'>Phone Number</label>
                    <input name='phone' type='phone' id='phone' onChange={handleChange}/>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Register;

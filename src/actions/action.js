import axios from "axios";

export const SET_NAME = 'SET_NAME';
export const SET_USERNAME = 'SET_USERNAME';

export const REGISTER_USER_START = 'REGISTER_USER_START';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

// action creators

export const setName = name => {
    return {type: SET_NAME, payload: name}
}

export const setUsername = username => {
    return {type: SET_USERNAME, payload: username}
}

export const registerUserAction = (infoNeeded, history) => dispatch => {
    dispatch({type: REGISTER_USER_START});
    axios.post('https://business-card-collector.herokuapp.com/api/users/register', infoNeeded)
      .then(response => {
        //console.log(response);
        history.push('/login');
        dispatch({type: REGISTER_USER_SUCCESS, payload: response.data});
      })
      .catch(err => {
             console.log(err)
             dispatch({type: REGISTER_USER_ERROR, payload: err})
      });
}

export const loginUser = (userInfo, history) => dispatch => {
    console.log(userInfo);
    dispatch({type: LOGIN_USER_START});
    // TODO: Update url when available
    axios.post('https://business-card-collector.herokuapp.com/api/users/login', userInfo)
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        dispatch({type: LOGIN_USER_SUCCESS, payload: response.data});

        //Checks to make sure the website and phone in local storage corresponds to the current user.
        //If not, removes those items from local storage.
        //TODO: Once we have our own back end, we can store phone and website in database and can remove this functionality.
        if (response.data.user.username !== localStorage.getItem('username')) {
            localStorage.removeItem('phone');
            localStorage.removeItem('website');
        }

        history.push('/djs');
      })
      .catch(err => {
            dispatch({type: LOGIN_USER_ERROR, payload: err});
            console.log(err);
      });
  }

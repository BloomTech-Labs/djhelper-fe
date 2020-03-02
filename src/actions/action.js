import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const SET_NAME = 'SET_NAME';
export const SET_USERNAME = 'SET_USERNAME';

export const REGISTER_USER_START = 'REGISTER_USER_START';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const LOGOUT_USER_START = 'LOGOUT_USER_START';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';

export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';

export const EDIT_USER_START = 'EDIT_USER_START';
export const EDIT_USER_START_PROCESSING = 'EDIT_USER_START_PROCESSING';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_ERROR = 'EDIT_USER_ERROR';
export const EDIT_USER_CANCEL = 'EDIT_USER_CANCEL';

// action creators

export const setName = name => {
    return {type: SET_NAME, payload: name}
}

export const setUsername = username => {
    return {type: SET_USERNAME, payload: username}
}

export const registerUserAction = (infoNeeded, history) => dispatch => {
    dispatch({type: REGISTER_USER_START});
    axios.post('http://ec2-18-218-74-229.us-east-2.compute.amazonaws.com/api/register/dj/', infoNeeded)
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
    // TODO: Update url when deployed backend is available
    axios.post('http://ec2-18-218-74-229.us-east-2.compute.amazonaws.com/api/login/dj/', userInfo)
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        dispatch({type: LOGIN_USER_SUCCESS, payload: response.data});
        history.push('/dj');
      })
      .catch(err => {
            dispatch({type: LOGIN_USER_ERROR, payload: err});
            console.log(err);
      });
  }

  export const logoutUser = () => dispatch => {

      dispatch({type: LOGOUT_USER_START});
      if (localStorage.getItem('token')) {
          console.log(localStorage.getItem('token'))
          localStorage.removeItem('token');
          dispatch({type: LOGOUT_USER_SUCCESS});
      } else {
          dispatch({type: LOGOUT_USER_ERROR, payload: 'no token found'})
      }
  }

  export const deleteUser = id => dispatch => {
      console.log('in deleteUser action');
      dispatch({type: DELETE_USER_START});
      //TODO: Endpoint might change when auth router is set up in backend; change it here if needed.
      //TODO: Update endpoint when deployed endpoint is ready.
      axiosWithAuth().delete(`http://ec2-18-218-74-229.us-east-2.compute.amazonaws.com/api/auth/dj/${id}`)
        .then(response => {
            console.log(response);
            if (localStorage.getItem('token')) {
                console.log(localStorage.getItem('token'))
                localStorage.removeItem('token');
            }
            dispatch({type: DELETE_USER_SUCCESS});
        })
        .catch(err => {
            console.log(err);
            dispatch({type: DELETE_USER_ERROR, payload: err})
        })
  }

  export const startEditUser = () =>  dispatch => {
    dispatch({type: EDIT_USER_START});
  }

  export const editUser = (id, userInfo) => dispatch => {
    dispatch({type: EDIT_USER_START_PROCESSING});
    axiosWithAuth().put(`http://ec2-18-218-74-229.us-east-2.compute.amazonaws.com/api/auth/dj/${id}`, userInfo)
        .then(response => {
            console.log(response);
            dispatch({type: EDIT_USER_SUCCESS, payload: response.data})
        })
        .catch(err => {
            console.log(err);
            dispatch({type: EDIT_USER_ERROR, payload: err})
        })
  }

  export const cancelEditUser = () =>  dispatch => {
    dispatch({type: EDIT_USER_CANCEL});
  }

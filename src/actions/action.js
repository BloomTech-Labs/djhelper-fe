import { axiosWithAuth } from '../utils/axiosWithAuth';
import {
  axiosWithAuthSpotify,
  axiosWithAuthSpotifySearch
} from '../utils/axiosWithAuthSpotify';

import URLSearchParams from '@ungap/url-search-params';

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

export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const SEARCH_FOR_TRACK_START = 'SEARCH_FOR_TRACK_START';
export const SEARCH_FOR_TRACK_SUCCESS = 'SEARCH_FOR_TRACK_SUCCESS';
export const SEARCH_FOR_TRACK_ERROR = 'SEARCH_FOR_TRACK_ERROR';
export const ADD_EVENT_START = 'ADD_EVENT_START';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const ADD_EVENT_ERROR = 'ADD_EVENT_ERROR';

// action creators

export const setName = name => {
  return { type: SET_NAME, payload: name };
};

export const setUsername = username => {
  return { type: SET_USERNAME, payload: username };
};

export const registerUserAction = (infoNeeded, history) => dispatch => {
  dispatch({ type: REGISTER_USER_START });
  axiosWithAuth()
    .post('/register/dj/', infoNeeded)
    .then(response => {
      history.push('/login');
      dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REGISTER_USER_ERROR, payload: err });
    });
};

export const loginUser = (userInfo, history) => dispatch => {
  console.log(userInfo);
  dispatch({ type: LOGIN_USER_START });

  axiosWithAuth()
    .post('/login/dj/', userInfo)
    .then(response => {
      console.log(response);
      localStorage.setItem('token', response.data.token);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });

      // Getting client id, secret, and grant type into correct format
      let data = new URLSearchParams({
        client_id:
          'OGZlMzYxN2QxMjc0NGY2YmI3YzRmZGFmNWMwMjJlMDI6YzMzYWZkNjY1NTI5NDE4YjgwZTkyZTYyOGM5MTQwMGE=',
        grant_type: 'client_credentials'
      });

      // Getting an access token for the spotify API
      axiosWithAuthSpotify()
        .post('/api/token', data)
        .then(response => {
          localStorage.setItem(
            'spotifyAccessToken',
            response.data.access_token
          );
          console.log(response.data);
        })
        .catch(err => {
          console.log(err.response);
        });

      if (
        response.data.bio.length === 0 &&
        response.data.phone.length === 0 &&
        response.data.website.length === 0 &&
        response.data.profile_pic_url.length === 0
      ) {
        history.push('/dj/setup');
      } else {
        history.push('/dj');
      }
    })
    .catch(err => {
      dispatch({ type: LOGIN_USER_ERROR, payload: err });
      console.log(err);
    });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT_USER_START });
  if (localStorage.getItem('token')) {
    console.log(localStorage.getItem('token'));
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } else {
    dispatch({ type: LOGOUT_USER_ERROR, payload: 'no token found' });
  }
};

export const deleteUser = id => dispatch => {
  console.log('in deleteUser action');
  dispatch({ type: DELETE_USER_START });
  axiosWithAuth()
    .delete(`/auth/dj/${id}`)
    .then(response => {
      console.log(response);
      if (localStorage.getItem('token')) {
        console.log(localStorage.getItem('token'));
        localStorage.removeItem('token');
      }
      dispatch({ type: DELETE_USER_SUCCESS });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: DELETE_USER_ERROR, payload: err });
    });
};

export const startEditUser = () => dispatch => {
  dispatch({ type: EDIT_USER_START });
};

export const editUser = (id, userInfo) => dispatch => {
  dispatch({ type: EDIT_USER_START_PROCESSING });
  axiosWithAuth()
    .put(`/auth/dj/${id}`, userInfo)
    .then(response => {
      console.log(response);
      dispatch({ type: EDIT_USER_SUCCESS, payload: response.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: EDIT_USER_ERROR, payload: err });
    });
};

export const cancelEditUser = () => dispatch => {
  dispatch({ type: EDIT_USER_CANCEL });
};

export const updateUser = (history, id, userInfo) => dispatch => {
  dispatch({ type: UPDATE_USER_START });
  axiosWithAuth()
    .put(`/auth/dj/${id}`, userInfo)
    .then(response => {
      console.log(response);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
      history.push('/dj');
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: UPDATE_USER_ERROR, payload: err });
      history.push('/dj');
    });
};

export const searchForTrack = searchTerm => dispatch => {
  dispatch({ type: SEARCH_FOR_TRACK_START });

  axiosWithAuthSpotifySearch()
    .get(`?q=<${searchTerm}>&type=track`)
    .then(response => {
      console.log(response);
      dispatch({
        type: SEARCH_FOR_TRACK_SUCCESS,
        payload: response.data.tracks.items
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SEARCH_FOR_TRACK_ERROR, payload: err });
    });
};

export const addEvent = (eventInfo, history) => dispatch => {
  dispatch({ type: ADD_EVENT_START });
  // TODO: axiosWithAuth goes here -- probably a call to the 'add location' endpoint first, then to the 'add event' endpoint
  // TODO: replace eventNum belows with event_id that is returned from the back end.
  const eventNum = Math.floor(Math.random() * 1000000);
  const eventToSubmit = { ...eventInfo, event_id: eventNum };
  dispatch({
    type: ADD_EVENT_SUCCESS,
    payload: eventToSubmit
  });
  history.push('/dj');
  // TODO: handle error
};

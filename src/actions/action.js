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

export const EDIT_EVENT_START = 'EDIT_EVENT_START';
export const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
export const EDIT_EVENT_ERROR = 'EDIT_EVENT_ERROR';

export const DELETE_EVENT_START = 'DELETE_EVENT_START';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_ERROR = 'DELETE_EVENT_ERROR';

export const ADD_LOCATION_START = 'ADD_LOCATION_START';
export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS';
export const ADD_LOCATION_ERROR = 'ADD_LOCATION_ERROR';

export const GET_DJ_START = 'GET_DJ_START';
export const GET_DJ_SUCCESS = 'GET_DJ_SUCCESS';
export const GET_DJ_ERROR = 'GET_DJ_ERROR';

export const ADD_SONG_TO_PLAYLIST_START = 'ADD_SONG_TO_PLAYLIST_START';
export const ADD_SONG_TO_PLAYLIST_SUCCESS = 'ADD_SONG_TO_PLAYLIST_SUCCESS';
export const ADD_SONG_TO_PLAYLIST_ERROR = 'ADD_SONG_TO_PLAYLIST_ERROR';

export const GET_EVENTS_START = 'GET_EVENTS_START';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_ERROR = 'GET_EVENTS_ERROR';

// action creators

export const addSongToPlaylistDJ = (songInfo, add_to_event_id) => dispatch => {
  dispatch({ type: ADD_SONG_TO_PLAYLIST_START });

  const songToAdd = {
    songInfo: songInfo,
    event_id: add_to_event_id
  };
  dispatch({
    type: ADD_SONG_TO_PLAYLIST_SUCCESS,
    payload: songToAdd
  });
};
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
        !response.data.bio &&
        !response.data.phone &&
        !response.data.website &&
        !response.data.profile_pic_url
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

// songs

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

// events

export const addEvent = (eventInfo, history) => dispatch => {
  dispatch({ type: ADD_EVENT_START });

  // First, add location to locations table. POST https://api.dj-helper.com/api/location/
  // TODO: Change endpoint to auth/location/ if BE changes to that.
  dispatch({ type: ADD_LOCATION_START });
  const locationInfo = {
    address_line_1: eventInfo.address_line_1,
    address_line_2: eventInfo.address_line_2 || '',
    city: eventInfo.city,
    state: eventInfo.state,
    zip: eventInfo.zip,
    phone: eventInfo.phone,
    website: eventInfo.website,
    email: eventInfo.email,
    img_url: eventInfo.img_url,
    name: eventInfo.location_name
  };
  axiosWithAuth()
    .post('/location/', locationInfo)
    .then(response => {
      // console.log("Here's the response from POST location: ", response);

      // TODO: Modify this once BE is changed to return location info.
      // While it returns nothing, keep this GET locations and filter to get location info.
      axiosWithAuth()
        .get('/locations')
        .then(response2 => {
          // console.log("Here's the response from GET locations: ", response2);
          const winnerLocation = response2.data.filter(
            location => location.address_line_1 === eventInfo.address_line_1
          )[0];
          dispatch({ type: ADD_LOCATION_SUCCESS, payload: winnerLocation });
          // console.log('Winner Location: ', winnerLocation);

          // Next, POST to https://api.dj-helper.com/api/event/

          const eventToSubmit = {
            name: eventInfo.name,
            event_type: eventInfo.event_type,
            description: eventInfo.description,
            location_id: winnerLocation.id,
            date: eventInfo.date,
            dj_id: eventInfo.dj_id
          };
          axiosWithAuth()
            .post('/event/', eventToSubmit)
            .then(response3 => {
              // While POST event BE returns nothing, do additional call to GET events and filter to get the event back
              // TODO: Modify this once BE is changed to return event info.

              // GET https://api.dj-helper.com/api/events
              axiosWithAuth()
                .get('/events')
                .then(response4 => {
                  const winnerEvent = response4.data.filter(
                    event => event.name === eventInfo.name
                  )[0];
                  // TODO: Modify what is returned for playlist_id and request_list_id once functionality is built for that
                  dispatch({
                    type: ADD_EVENT_SUCCESS,
                    payload: {
                      ...winnerEvent,
                      event_id: winnerEvent.id,
                      playlist_id: winnerEvent.id,
                      request_list_id: winnerEvent.id
                    }
                  });
                  history.push('/dj');
                })
                .catch(err4 => console.log(err4));
            })
            .catch(err3 => {
              console.log(err3);
              dispatch({
                type: ADD_EVENT_ERROR,
                payload: err3
              });
            });
        })
        .catch(err2 => {
          console.log(err2);
          dispatch({ type: ADD_LOCATION_ERROR, payload: err2 });
        });
    })
    .catch(err1 => {
      console.log(err1);
    });
};

export const editEvent = eventInfo => dispatch => {
  dispatch({ type: EDIT_EVENT_START });
  // TODO: Add PUT to edit event endpoint here
  dispatch({ type: EDIT_EVENT_SUCCESS, payload: eventInfo });
  // TODO: Add handle error
};

export const deleteEvent = (event_id, history) => dispatch => {
  dispatch({ type: DELETE_EVENT_START });
  // TODO: Add DELETE to back end endpoint here
  dispatch({ type: DELETE_EVENT_SUCCESS, payload: event_id });
  history.push('/dj');
  // TODO: Add handle error
};

// get dj

export const getDJ = id => dispatch => {
  dispatch({ type: GET_DJ_START });
  axiosWithAuth()
    .get(`/dj/${id}`)
    .then(response => {
      console.log(response);
      dispatch({ type: GET_DJ_SUCCESS, payload: response.data[0] });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_DJ_ERROR, payload: err });
    });
};

// getting events

export const getEvents = dj_id => dispatch => {
  // GET https://api.dj-helper.com/api/events
  dispatch({ type: GET_EVENTS_START });
  axiosWithAuth()
    .get('/events')
    .then(response => {
      // console.log(response);
      // TODO: format the response to match what is needed for events in store, and pass it as payload
      // TODO: Modify what is returned for playlist_id and request_list_id once functionality is built for that

      const formattedObjects = response.data.map(event => {
        return {
          [`event${event.id}`]: {
            event_id: event.id,
            name: event.name,
            event_type: event.event_type,
            description: event.description,
            date: event.date,
            start_time: event.start_time,
            end_time: event.end_time,
            location_id: event.location_id,
            request_list_id: event.id,
            playlist_id: event.id,
            img_url: event.img_url
          }
        };
      });
      //console.log('Formatted objects: ', formattedObjects);
      // convert formattedObjects array into an object
      const events = {};
      response.data.forEach(event => {
        events[`event${event.id}`] = {
          event_id: event.id,
          name: event.name,
          event_type: event.event_type,
          description: event.description,
          date: event.date,
          start_time: event.start_time,
          end_time: event.end_time,
          location_id: event.location_id,
          request_list_id: event.id,
          playlist_id: event.id,
          img_url: event.img_url
        };
      });
      console.log("Here's the formatted object: ", events);
      dispatch({ type: GET_EVENTS_SUCCESS });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_EVENTS_ERROR });
    });
};

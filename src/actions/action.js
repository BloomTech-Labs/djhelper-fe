/* eslint-disable camelcase */
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

export const REMOVE_SONG_FROM_PLAYLIST_START =
  'REMOVE_SONG_FROM_PLAYLIST_START';
export const REMOVE_SONG_FROM_PLAYLIST_SUCCESS =
  'REMOVE_SONG_FROM_PLAYLIST_SUCCESS';
export const REMOVE_SONG_FROM_PLAYLIST_ERROR =
  'REMOVE_SONG_FROM_PLAYLIST_ERROR';

export const ADD_TO_SONG_REDUCER_START = 'ADD_TO_SONG_REDUCER_START';
export const ADD_TO_SONG_REDUCER_SUCCESS = 'ADD_TO_SONG_REDUCER_SUCCESS';
export const ADD_TO_SONG_REDUCER_ERROR = 'ADD_TO_SONG_REDUCER_ERROR';

export const GET_SONG_BY_ID_START = 'GET_SONG_BY_ID_START';
export const GET_SONG_BY_ID_SUCCESS = 'GET_SONG_BY_ID_SUCCESS';
export const GET_SONG_BY_ID_ERROR = 'GET_SONG_BY_ID_ERROR';

export const GET_EVENTS_START = 'GET_EVENTS_START';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_ERROR = 'GET_EVENTS_ERROR';

export const ADD_VOTE_START = 'ADD_VOTE_START';
export const ADD_VOTE_SUCCESS = 'ADD_VOTE_SUCCESS';
export const ADD_VOTE_ERROR = 'ADD_VOTE_ERROR';

export const GET_LOCATION_START = 'GET_LOCATION_START';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_LOCATION_ERROR = 'GET_LOCATION_ERROR';

export const EDIT_LOCATION_START = 'EDIT_LOCATION_START';
export const EDIT_LOCATION_SUCCESS = 'EDIT_LOCATION_SUCCESS';
export const EDIT_LOCATION_ERROR = 'EDIT_LOCATION_ERROR';

// action creators

export const addSongToPlaylistDJ = (
  songInfo,
  add_to_event_id,
  que_num = ''
) => dispatch => {
  dispatch({ type: ADD_SONG_TO_PLAYLIST_START });
  // TODO: 1. Add song to songs table in BE by POST to BE
  // TODO: 2. Attach song to event playlist by POST to BE

  const songForBE = {
    name: songInfo.name,
    spotify_id: songInfo.id
  };

  // Now, POST songForBE when endpoint is available.
  // Endpoint will be something like /auth/song
  // BE will return a song object with song id.
  /*
  const songToConnectToEvent = {
    song_id: response.id
  }

  if (que_num !== '') {
    songToConnectToEvent.que_num = que_num;
  }
  */
  // Now, POST songToConnectToEvent -- endpoint will be something like
  // /auth/event/:event_id/playlist/add_song

  const songToAdd = {
    songInfo: { ...songInfo, votes: 0 },
    event_id: add_to_event_id
  };
  dispatch({
    type: ADD_SONG_TO_PLAYLIST_SUCCESS,
    payload: songToAdd
  });
};

export const removeSongFromPlaylistDJ = (songId, event_id) => dispatch => {
  dispatch({ type: REMOVE_SONG_FROM_PLAYLIST_START });

  const info = {
    songId: songId,
    event_id: event_id
  };
  dispatch({
    type: REMOVE_SONG_FROM_PLAYLIST_SUCCESS,
    payload: info
  });
};

export const setName = name => {
  return { type: SET_NAME, payload: name };
};

export const setUsername = username => {
  return { type: SET_USERNAME, payload: username };
};

export const addVoteToSong = (event_id, song_id) => dispatch => {
  dispatch({ type: ADD_VOTE_START });

  const info = {
    event_id: event_id,
    song_id: song_id
  };
  dispatch({ type: ADD_VOTE_SUCCESS, payload: info });
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
      dispatch({ type: REGISTER_USER_ERROR, payload: err });
    });
};

export const loginUser = (userInfo, history) => dispatch => {
  dispatch({ type: LOGIN_USER_START });

  axiosWithAuth()
    .post('/login/dj/', userInfo)
    .then(response => {
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
        })
        .catch(err => {
          // handle error
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
    });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT_USER_START });
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } else {
    dispatch({ type: LOGOUT_USER_ERROR, payload: 'no token found' });
  }
};

export const deleteUser = id => dispatch => {
  dispatch({ type: DELETE_USER_START });
  axiosWithAuth()
    .delete(`/auth/dj/${id}`)
    .then(response => {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      dispatch({ type: DELETE_USER_SUCCESS });
    })
    .catch(err => {
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
      dispatch({ type: EDIT_USER_SUCCESS, payload: response.data });
    })
    .catch(err => {
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
      dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
      history.push('/dj');
    })
    .catch(err => {
      dispatch({ type: UPDATE_USER_ERROR, payload: err });
      history.push('/dj');
    });
};

// songs

export const searchForTrack = searchTerm => dispatch => {
  dispatch({ type: SEARCH_FOR_TRACK_START });

  axiosWithAuthSpotifySearch()
    .get(`/search?q=<${searchTerm}>&type=track&market=US`)
    .then(response => {
      dispatch({
        type: SEARCH_FOR_TRACK_SUCCESS,
        payload: response.data.tracks.items
      });
    })
    .catch(err => {
      dispatch({ type: SEARCH_FOR_TRACK_ERROR, payload: err });
    });
};

export const getSongInfoBySpotifyId = spotify_id => dispatch => {
  dispatch({ type: GET_SONG_BY_ID_START });
  axiosWithAuthSpotifySearch()
    .get(`/tracks${spotify_id}`)
    .then(response => {
      dispatch({
        type: GET_SONG_BY_ID_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({ type: GET_SONG_BY_ID_ERROR });
    });
};

// events

export const addEvent = (eventInfo, history) => dispatch => {
  dispatch({ type: ADD_EVENT_START });

  dispatch({ type: ADD_TO_SONG_REDUCER_START });

  // First, add location to locations table. POST https://api.dj-helper.com/api/auth/location/

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
    .post('/auth/location/', locationInfo)
    .then(response => {
      dispatch({ type: ADD_LOCATION_SUCCESS, payload: response.data });

      // Next, POST to https://api.dj-helper.com/api/auth/event/

      const eventToSubmit = {
        name: eventInfo.name,
        event_type: eventInfo.event_type,
        description: eventInfo.description,
        location_id: response.data.id,
        date: eventInfo.date,
        dj_id: eventInfo.dj_id
      };

      // Only adds start_time and end_time if the user has put values in those fields
      // (Without these lines, app crashes if the start_time and end_time are left blank)
      if (eventInfo.start_time !== '') {
        eventToSubmit.start_time = eventInfo.start_time;
      }

      if (eventInfo.end_time !== '') {
        eventToSubmit.end_time = eventInfo.end_time;
      }

      axiosWithAuth()
        .post('/auth/event/', eventToSubmit)
        .then(response2 => {
          // TODO: Modify what is returned for playlist_id and request_list_id once functionality is built for that
          dispatch({
            type: ADD_EVENT_SUCCESS,
            payload: {
              ...response2.data,
              event_id: response2.data.id,
              playlist_id: response2.data.id,
              request_list_id: response2.data.id
            }
          });
          dispatch({
            type: ADD_TO_SONG_REDUCER_SUCCESS,
            payload: response2.data.id
          });
          history.push('/dj');
        })
        .catch(err2 => {
          dispatch({
            type: ADD_EVENT_ERROR,
            payload: err2
          });
        })
        .catch(err => {
          dispatch({ type: ADD_LOCATION_ERROR, payload: err });
        });
    });
};

export const editEvent = (eventInfo, event_id) => dispatch => {
  dispatch({ type: EDIT_EVENT_START });
  // PUT https://api.dj-helper.com/api/auth/event/:event_id
  axiosWithAuth()
    .put(`/auth/event/${event_id}`, eventInfo)
    .then(response => {
      const formattedResponse = {
        event_id: response.data.id,
        dj_id: response.data.dj_id,
        name: response.data.name,
        date: response.data.date,
        start_time: response.data.start_time,
        end_time: response.data.end_time,
        event_type: response.data.event_type,
        location_id: response.data.location_id,
        img_url: response.data.img_url,
        description: response.data.description
      };
      dispatch({
        type: EDIT_EVENT_SUCCESS,
        payload: [formattedResponse, event_id]
      });
    })
    .catch(err => {
      dispatch({ type: EDIT_EVENT_ERROR, payload: err });
    });
};

export const deleteEvent = (event, history) => dispatch => {
  dispatch({ type: DELETE_EVENT_START });
  // DELETE https://api.dj-helper.com/api/auth/event/:event_id
  history.push('/dj');
  axiosWithAuth()
    .delete(`/auth/event/${event.event_id}`)
    .then(response => {
      dispatch({ type: DELETE_EVENT_SUCCESS, payload: event });
    })
    .catch(err => {
      dispatch({ type: DELETE_EVENT_ERROR, payload: err });
    });
};

// get dj

export const getDJ = id => dispatch => {
  dispatch({ type: GET_DJ_START });
  axiosWithAuth()
    .get(`/dj/${id}`)
    .then(response => {
      dispatch({ type: GET_DJ_SUCCESS, payload: response.data });
    })
    .catch(err => {
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
      // TODO: Modify what is returned for playlist_id and request_list_id once functionality is built for that

      const filteredEvents = response.data.filter(
        event => event.dj_id === dj_id
      );
      const eventsObject = {};
      filteredEvents.forEach(event => {
        eventsObject[`event${event.id}`] = {
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
          img_url: event.img_url,
          dj_id: event.dj_id
        };
        dispatch({
          type: ADD_TO_SONG_REDUCER_SUCCESS,
          payload: event.id
        });
      });
      dispatch({ type: GET_EVENTS_SUCCESS, payload: eventsObject });
    })
    .catch(err => {
      dispatch({ type: GET_EVENTS_ERROR });
    });
};

// locations

export const getLocation = location_id => dispatch => {
  // GET https://api.dj-helper.com/api/location/:location_id
  dispatch({ type: GET_LOCATION_START });
  axiosWithAuth()
    .get(`/location/${location_id}`)
    .then(response => {
      dispatch({ type: GET_LOCATION_SUCCESS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: GET_LOCATION_ERROR, payload: err });
    });
};

export const editLocation = (location_id, locationInfo) => dispatch => {
  dispatch({ type: EDIT_LOCATION_START });
  // PUT https://api.dj-helper.com/api/auth/location/:id
  axiosWithAuth()
    .put(`/auth/location/${location_id}`, locationInfo)
    .then(response => {
      dispatch({ type: EDIT_LOCATION_SUCCESS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: EDIT_LOCATION_ERROR, payload: err });
    });
};

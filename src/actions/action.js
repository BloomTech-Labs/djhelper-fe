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

export const GET_PLAYLIST_START = 'GET_PLAYLIST_START';
export const GET_PLAYLIST_SUCCESS = 'GET_PLAYLIST_SUCCESS';
export const GET_PLAYLIST_ERROR = 'GET_PLAYLIST_ERROR';

export const ADD_TO_SONG_REDUCER_START = 'ADD_TO_SONG_REDUCER_START';
export const ADD_TO_SONG_REDUCER_SUCCESS = 'ADD_TO_SONG_REDUCER_SUCCESS';
export const ADD_TO_SONG_REDUCER_ERROR = 'ADD_TO_SONG_REDUCER_ERROR';

export const GET_SONG_BY_ID_START = 'GET_SONG_BY_ID_START';
export const GET_SONG_BY_ID_SUCCESS = 'GET_SONG_BY_ID_SUCCESS';
export const GET_SONG_BY_ID_ERROR = 'GET_SONG_BY_ID_ERROR';

export const ADD_VOTE_START = 'ADD_VOTE_START';
export const ADD_VOTE_SUCCESS = 'ADD_VOTE_SUCCESS';
export const ADD_VOTE_ERROR = 'ADD_VOTE_ERROR';

export const EDIT_QUEUE_NUM_START = 'EDIT_QUEUE_NUM_START';
export const EDIT_QUEUE_NUM_SUCCESS = 'EDIT_QUEUE_NUM_START';
export const EDIT_QUEUE_NUM_ERROR = 'EDIT_QUEUE_NUM_START';

// action creators

// basic action creators

export const setName = name => {
  return { type: SET_NAME, payload: name };
};

export const setUsername = username => {
  return { type: SET_USERNAME, payload: username };
};

// onboarding

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

      const data = new URLSearchParams({
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
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

// CRUD for DJs

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

// playlist action creators

export const addSongToPlaylistDJ = (
  songInfo,
  add_to_event_id,
  queue_num = Math.floor(Math.random() * 10000) + 1 //BE needs a num > 0, for now
) => dispatch => {
  dispatch({ type: ADD_SONG_TO_PLAYLIST_START });

  const songForBE = {
    name: songInfo.name,
    spotify_id: songInfo.id
  };

  // 1. Add song to songs table in BE by POST to BE
  // POST https://api.dj-helper.com/api/auth/song/
  axiosWithAuth()
    .post('/auth/song', songForBE)
    .then(response => {
      // 2. Attach song to event playlist by POST to BE
      // https://api.dj-helper.com/api/auth/playlist?event=:event_id

      const songToConnectToEvent = {
        song_id: response.data.id,
        queue_num
      };

      axiosWithAuth()
        .post(`/auth/playlist?event=${add_to_event_id}`, songToConnectToEvent)
        .then(res => {
          // Note: The response returns an id that will be stored in the redux store as connections_id
          const songToAdd = {
            songInfo: {
              ...songInfo,
              votes: 0,
              connections_id: res.data.id,
              queue_num
            },
            event_id: add_to_event_id
          };
          dispatch({
            type: ADD_SONG_TO_PLAYLIST_SUCCESS,
            payload: songToAdd
          });
        })
        .catch(err2 => {
          dispatch({
            type: ADD_SONG_TO_PLAYLIST_ERROR,
            payload: err2
          });
        });
    })
    .catch(err => {
      dispatch({
        type: ADD_SONG_TO_PLAYLIST_ERROR,
        payload: err
      });
    });
};

export const removeSongFromPlaylistDJ = (songInfo, event_id) => dispatch => {
  dispatch({ type: REMOVE_SONG_FROM_PLAYLIST_START });

  const info = {
    songId: songInfo.id,
    event_id
  };
  // DELETE https://api.dj-helper.com/api/auth/playlist/entry/:connections_id
  axiosWithAuth()
    .delete(`/auth/playlist/entry/${songInfo.connections_id}`)
    .then(response => {
      dispatch({
        type: REMOVE_SONG_FROM_PLAYLIST_SUCCESS,
        payload: info
      });
    })
    .catch(err => console.log(err));
};

export const getPlaylist = event_id => dispatch => {
  dispatch({ type: GET_PLAYLIST_START });
  // GET https://api.dj-helper.com/api/playlist/:event_id
  axiosWithAuth()
    .get(`/playlist/${event_id}`)
    .then(response => {
      // response.data includes id (connections_id), event_id, song_id, and queue_num.
      // We need to use the song_id to get the spotify_id, in order to get all the song info.
      const playlist = [];
      response.data.forEach(item => {
        // GET https://api.dj-helper.com/api/song/:song_id
        axiosWithAuth()
          .get(`/song/${item.song_id}`)
          .then(res => {
            axiosWithAuthSpotifySearch()
              .get(`/tracks/${res.data.spotify_id}`)
              .then(res2 => {
                res2.data.queue_num = item.queue_num;
                res2.data.connections_id = item.id;
                playlist.push(res2.data);
              })
              .catch(err2 => {
                dispatch({ type: GET_PLAYLIST_ERROR, payload: err2 });
              });
          })
          .catch(err => {
            dispatch({ type: GET_PLAYLIST_ERROR, payload: err });
          });
      }); // closes forEach

      const playlistObject = {
        eventId: event_id,
        formattedPlaylist: playlist
      };
      dispatch({ type: GET_PLAYLIST_SUCCESS, payload: playlistObject });
    })
    .catch(err3 => {
      dispatch({ type: GET_PLAYLIST_ERROR, payload: err3 });
    });
};

// songs

export const addVoteToSong = (event_id, song_id) => dispatch => {
  dispatch({ type: ADD_VOTE_START });

  const info = {
    event_id: event_id,
    song_id: song_id
  };
  dispatch({ type: ADD_VOTE_SUCCESS, payload: info });
};

export const editQueueNum = (connections_id, queue_num) => dispatch => {
  dispatch({ type: EDIT_QUEUE_NUM_START });
  const requestBody = {
    queue_num: queue_num
  };
  // PUT https://api.dj-helper.com/api/auth/playlist/entry/:connections_id
  axiosWithAuth()
    .put(`/playlist/${connections_id}`, requestBody)
    .then(response => {
      console.log(response);
      dispatch({ type: EDIT_QUEUE_NUM_SUCCESS, payload: response.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: EDIT_QUEUE_NUM_ERROR, payload: err });
    });
};

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
  // TODO: Add cases in reducer to take care of GET_SONG_BY_ID_START, SUCCESS and ERROR
  dispatch({ type: GET_SONG_BY_ID_START });
  axiosWithAuthSpotifySearch()
    .get(`/tracks/${spotify_id}`)
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

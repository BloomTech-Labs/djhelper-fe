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
export const GET_PLAYLIST_END = 'GET_PLAYLIST_END';

export const ADD_TO_SONG_REDUCER_START = 'ADD_TO_SONG_REDUCER_START';
export const ADD_TO_SONG_REDUCER_SUCCESS = 'ADD_TO_SONG_REDUCER_SUCCESS';
export const ADD_TO_SONG_REDUCER_ERROR = 'ADD_TO_SONG_REDUCER_ERROR';

export const GET_SONG_BY_ID_START = 'GET_SONG_BY_ID_START';
export const GET_SONG_BY_ID_SUCCESS = 'GET_SONG_BY_ID_SUCCESS';
export const GET_SONG_BY_ID_ERROR = 'GET_SONG_BY_ID_ERROR';

export const ADD_VOTE_START = 'ADD_VOTE_START';
export const ADD_VOTE_SUCCESS = 'ADD_VOTE_SUCCESS';
export const ADD_VOTE_ERROR = 'ADD_VOTE_ERROR';

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
  queue_num = ''
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

  if (queue_num !== '') {
    songToConnectToEvent.queue_num = queue_num;
  }
  */
  // Now, POST songToConnectToEvent -- endpoint will be something like
  // /auth/event/:event_id/playlist/add_song

  // The BE should return an id that we can include in the songInfo that is used in the payload.
  /*
  const songToAdd = {
    songInfo: { ...songInfo, votes: 0, db_id: response.id },
    event_id: add_to_event_id
  };
  */
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

export const getPlaylist = event_id => dispatch => {
  dispatch({ type: GET_PLAYLIST_START });
  /* TODO: GET endpoint once BE is set up for that.
  // Probably will be something like /event/:event_id/playlist

  // Playlist info will come back with songs formatted like
  // {name: 'song name', spotify_id: '4jdkfkdsl', id: 5}

  // We will probably need to loop through the playlist to get the spotify info for each song in the playlist.
  formattedPlaylist = [];
  response.forEach(
  axiosWithAuthSpotifySearch()
    .get(`/tracks${spotify_id}`)
    .then(res => {
      formattedPlaylist.push(res.data);
    })
    .catch(err => console.log(err));
  );

  // Something to consider: would it be important to add the id from our BE to the song object??

  Then the playlist can be passed as part of the payload, below called formattedPlaylist:
  const playlistObject = {
    eventId: event_id;
    formattedPlaylist: formattedPlaylist;
  }
  dispatch({ type: GET_PLAYLIST_SUCCESS, payload: playlistObject});
  */
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

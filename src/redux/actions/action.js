/* eslint-disable camelcase */
import React from 'react';
import * as ActionTypes from './actionTypes';

import axiosWithAuth from '../../utils/axiosWithAuth';
import {
  axiosWithAuthSpotify,
  axiosWithAuthSpotifySearch
} from '../../utils/axiosWithAuthSpotify';
import { Route, Redirect } from 'react-router-dom';

import URLSearchParams from '@ungap/url-search-params';
import keyMirror from 'keymirror';

export const setName = name => {
  return { type: ActionTypes.SET_NAME, payload: name };
};

export const setUsername = username => {
  return { type: ActionTypes.SET_USERNAME, payload: username };
};

// onboarding
export const loginUser = (userInfo, history) => dispatch => {
  dispatch({ type: ActionTypes.LOGIN_USER_START });

  axiosWithAuth()
    .post('/login/dj/', userInfo)
    .then(response => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.id);
      dispatch({
        type: ActionTypes.LOGIN_USER_SUCCESS,
        payload: response.data
      });
      history.push('/dj');
    })
    .catch(err => {
      dispatch({ type: ActionTypes.LOGIN_USER_ERROR, payload: err });
    });
};

export const registerUserAction = (infoNeeded, history) => dispatch => {
  dispatch({ type: ActionTypes.REGISTER_USER_START });
  axiosWithAuth()
    .post('/register/dj/', infoNeeded)
    .then(response => {
      // history.push('/dj');
      dispatch({
        type: ActionTypes.REGISTER_USER_SUCCESS,
        payload: response.data
      });

      // login user

      dispatch({ type: ActionTypes.LOGIN_USER_START });
      axiosWithAuth()
        .post('/login/dj/', infoNeeded)
        .then(response2 => {
          localStorage.setItem('token', response2.data.token);
          dispatch({
            type: ActionTypes.LOGIN_USER_SUCCESS,
            payload: response2.data
          });
          history.push('/dj');
        })
        .catch(err => {
          dispatch({ type: ActionTypes.LOGIN_USER_ERROR, payload: err });
        });

      // end of login user
    })
    .catch(err => {
      dispatch({ type: ActionTypes.REGISTER_USER_ERROR, payload: err });
    });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: ActionTypes.LOGOUT_USER_START });
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.LOGOUT_USER_SUCCESS });
  } else {
    dispatch({
      type: ActionTypes.LOGOUT_USER_ERROR,
      payload: 'no token found'
    });
  }
};

// CRUD for DJs

export const deleteUser = id => dispatch => {
  dispatch({ type: ActionTypes.DELETE_USER_START });
  axiosWithAuth()
    .delete(`/auth/dj/${id}`)
    .then(response => {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      dispatch({ type: ActionTypes.DELETE_USER_SUCCESS });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.DELETE_USER_ERROR, payload: err });
    });
};

export const startEditUser = () => dispatch => {
  dispatch({ type: ActionTypes.EDIT_USER_START });
};

export const editUser = (id, userInfo) => dispatch => {
  dispatch({ type: ActionTypes.EDIT_USER_START_PROCESSING });
  axiosWithAuth()
    .put(`/auth/dj/${id}`, userInfo)
    .then(response => {
      dispatch({ type: ActionTypes.EDIT_USER_SUCCESS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.EDIT_USER_ERROR, payload: err });
    });
};

export const cancelEditUser = () => dispatch => {
  dispatch({ type: ActionTypes.EDIT_USER_CANCEL });
};

export const updateUser = (history, id, userInfo) => dispatch => {
  dispatch({ type: ActionTypes.UPDATE_USER_START });
  axiosWithAuth()
    .put(`/auth/dj/${id}`, userInfo)
    .then(response => {
      dispatch({
        type: ActionTypes.UPDATE_USER_SUCCESS,
        payload: response.data
      });
      history.push('/dj');
    })
    .catch(err => {
      dispatch({ type: ActionTypes.UPDATE_USER_ERROR, payload: err });
      history.push('/dj');
    });
};

// playlist action creators

export const addSongToPlaylistDJ = (songInfo, add_to_event_id) => dispatch => {
  dispatch({ type: ActionTypes.ADD_SONG_TO_PLAYLIST_START });

  const songForBE = {
    name: songInfo.name,
    spotify_id: songInfo.id
  };

  // 1. Add song to songs table in BE by POST to BE
  // POST https://api.dj-helper.com/api/auth/song/
  axiosWithAuth()
    .post('/auth/song', songForBE)
    .then(response1 => {
      // 2. Attach song to event playlist by POST to BE
      // https://api.dj-helper.com/api/auth/playlist?event=:event_id

      // 2.5 Find length of playlist to know what the initial queue_num should be for this song.
      axiosWithAuth()
        .get(`/playlist/${add_to_event_id}`)
        .then(response2 => {
          const songToConnectToEvent = {
            song_id: response1.data.id,
            queue_num: response2.data.length + 1
          };

          axiosWithAuth()
            .post(
              `/auth/playlist?event=${add_to_event_id}`,
              songToConnectToEvent
            )
            .then(response3 => {
              // Note: The response returns an id that will be stored in the redux store as connections_id
              const songToAdd = {
                songInfo: {
                  ...songInfo,
                  votes: 0,
                  connections_id: response3.data.id,
                  queue_num: response2.data.length + 1
                },
                event_id: add_to_event_id
              };
              dispatch({
                type: ActionTypes.ADD_SONG_TO_PLAYLIST_SUCCESS,
                payload: songToAdd
              });
            })
            .catch(err3 => {
              dispatch({
                type: ActionTypes.ADD_SONG_TO_PLAYLIST_ERROR,
                payload: err3
              });
            });
        })
        .catch(err2 => {
          dispatch({
            type: ActionTypes.ADD_SONG_TO_PLAYLIST_ERROR,
            payload: err2
          });
        });
    })
    .catch(err1 => {
      dispatch({
        type: ActionTypes.ADD_SONG_TO_PLAYLIST_ERROR,
        payload: err1
      });
    });
};

export const removeSongFromPlaylistDJ = (songInfo, event_id) => dispatch => {
  dispatch({ type: ActionTypes.REMOVE_SONG_FROM_PLAYLIST_START });

  const info = {
    songId: songInfo.id,
    event_id
  };
  // DELETE https://api.dj-helper.com/api/auth/playlist/entry/:connections_id
  axiosWithAuth()
    .delete(`/auth/playlist/entry/${songInfo.connections_id}`)
    .then(response => {
      dispatch({
        type: ActionTypes.REMOVE_SONG_FROM_PLAYLIST_SUCCESS,
        payload: info
      });
    })
    .catch(err => console.log(err));
};

export const getPlaylist = event_id => dispatch => {
  dispatch({ type: ActionTypes.GET_PLAYLIST_START });
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
                dispatch({
                  type: ActionTypes.GET_PLAYLIST_ERROR,
                  payload: err2
                });
              });
          })
          .catch(err => {
            dispatch({ type: ActionTypes.GET_PLAYLIST_ERROR, payload: err });
          });
      }); // closes forEach

      const playlistObject = {
        eventId: event_id,
        formattedPlaylist: playlist
      };
      dispatch({
        type: ActionTypes.GET_PLAYLIST_SUCCESS,
        payload: playlistObject
      });
    })
    .catch(err3 => {
      dispatch({ type: ActionTypes.GET_PLAYLIST_ERROR, payload: err3 });
    });
};

// songs

export const addVoteToSong = (event_id, song_id) => dispatch => {
  dispatch({ type: ActionTypes.ADD_VOTE_START });

  const info = {
    event_id: event_id,
    song_id: song_id
  };
  dispatch({ type: ActionTypes.ADD_VOTE_SUCCESS, payload: info });
};

export const editQueueNum = (connections_id, queue_num) => dispatch => {
  dispatch({ type: ActionTypes.EDIT_QUEUE_NUM_START });
  const requestBody = {
    queue_num: queue_num
  };
  // PUT https://api.dj-helper.com/api/auth/playlist/entry/:connections_id
  axiosWithAuth()
    .put(`auth/playlist/entry/${connections_id}`, requestBody)
    .then(response => {
      console.log(response);
      dispatch({
        type: ActionTypes.EDIT_QUEUE_NUM_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ActionTypes.EDIT_QUEUE_NUM_ERROR, payload: err });
    });
};

export const searchForTrack = searchTerm => dispatch => {
  dispatch({ type: ActionTypes.SEARCH_FOR_TRACK_START });

  axiosWithAuthSpotifySearch()
    .get(`/search?q=<${searchTerm}>&type=track&market=US`)
    .then(response => {
      dispatch({
        type: ActionTypes.SEARCH_FOR_TRACK_SUCCESS,
        payload: response.data.tracks.items
      });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.SEARCH_FOR_TRACK_ERROR, payload: err });
    });
};

export const getSongInfoBySpotifyId = spotify_id => dispatch => {
  // TODO: Add cases in reducer to take care of GET_SONG_BY_ID_START, SUCCESS and ERROR
  dispatch({ type: ActionTypes.GET_SONG_BY_ID_START });
  axiosWithAuthSpotifySearch()
    .get(`/tracks/${spotify_id}`)
    .then(response => {
      dispatch({
        type: ActionTypes.GET_SONG_BY_ID_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.GET_SONG_BY_ID_ERROR });
    });
};

// get dj

export const getDJ = id => dispatch => {
  dispatch({ type: ActionTypes.GET_DJ_START });
  axiosWithAuth()
    .get(`/dj/${id}`)
    .then(response => {
      dispatch({ type: ActionTypes.GET_DJ_SUCCESS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.GET_DJ_ERROR, payload: err });
    });
};

// create modal

// export const  ActionTypes = keyMirror({
//   HIDE_MODAL: null,
//   SHOW_MODAL: null,
// })

// export const showModal = ({ modalProps, modalType }) => dispatch => {
//   dispatch({
//     type: ActionActionTypes.SHOW_MODAL,
//     modalProps,
//     modalType
//   })
// }
// export const hideModal = () => dispatch => {
//   dispatch({
//     type: ActionActionTypes.HIDE_MODAL
//   })
// }

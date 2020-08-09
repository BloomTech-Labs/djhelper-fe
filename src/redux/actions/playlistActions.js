import axiosWithAuth from '../../utils/axiosWithAuth';
import * as ActionTypes from './actionTypes';

export const moveTrack = id => dispatch => {
  console.log('moveTrack ID: ', id);
  axiosWithAuth()
    .post(`/auth/track/move/${id}`)
    .then(res => {
      dispatch({
        type: ActionTypes.MOVE_TRACK_SUCCESS,
        payload: res.data,
        trackId: id
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.MOVE_TRACK_ERROR,
        payload: err
      });
    });
};

export const getPlaysLists = id => dispatch => {
  axiosWithAuth()
    .get(`/event/${id}/playlist`)
    .then(res => {
      dispatch({
        type: ActionTypes.GET_PLAYLISTS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_PLAYLISTS_ERROR,
        payload: err
      });
    });
};

export const removePlaylistTrack = id => dispatch => {
  axiosWithAuth()
    .delete(`/auth/track/playlist/${id}`)
    .then(res => {
      dispatch({
        type: ActionTypes.REMOVE_PLAYLIST_TRACK_SUCCESS,
        payload: id
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.REMOVE_PLAYLIST_TRACK_ERRROR,
        payload: err
      });
    });
};

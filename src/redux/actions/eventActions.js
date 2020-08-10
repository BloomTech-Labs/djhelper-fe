import axiosWithAuth from '../../utils/axiosWithAuth';
import * as ActionTypes from './actionTypes';
// import { getPlaylist } from './action';

export const addEvent = (eventInfo, history) => dispatch => {
  dispatch({ type: ActionTypes.ADD_EVENT_START });
  // dispatch({ type: ActionTypes.ADD_TO_SONG_REDUCER_START });

  const eventToSubmit = {
    name: eventInfo.name,
    date: eventInfo.date,
    dj_id: eventInfo.dj_id,
    isExplicit: eventInfo.isExplicit,
    notes: eventInfo.notes
  };

  return axiosWithAuth()
    .post('/auth/event/', eventToSubmit)
    .then(response2 => {
      dispatch({
        type: ActionTypes.ADD_EVENT_SUCCESS,
        payload: { ...response2.data }
      });
      history.push('/dj');
      return response2;
    })
    .catch(err2 => {
      dispatch({
        type: ActionTypes.ADD_EVENT_ERROR,
        payload: err2
      });
      return err2;
    });
};

export const editEvent = (eventInfo, eventId) => dispatch => {
  dispatch({ type: ActionTypes.EDIT_EVENT_START });
  axiosWithAuth()
    .put(`/auth/event/${eventId}`, eventInfo)
    .then(response => {
      dispatch({
        type: ActionTypes.EDIT_EVENT_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.EDIT_EVENT_ERROR, payload: err });
    });
};

export const deleteEvent = (eventId, history) => dispatch => {
  dispatch({ type: ActionTypes.DELETE_EVENT_START });
  axiosWithAuth()
    .delete(`/auth/event/${eventId}`)
    .then(response => {
      dispatch({ type: ActionTypes.DELETE_EVENT_SUCCESS, payload: eventId });
      history.push('/dj');
    })
    .catch(err => {
      dispatch({ type: ActionTypes.DELETE_EVENT_ERROR, payload: err });
    });
};

// getting events by DJ id

export const getEvents = djId => dispatch => {
  dispatch({ type: ActionTypes.GET_EVENTS_START });
  axiosWithAuth()
    .get('/events')
    .then(response => {
      const filteredEvents = response.data.filter(
        event => event.dj_id === djId
      );
      dispatch({
        type: ActionTypes.GET_EVENTS_SUCCESS,
        payload: filteredEvents
      });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.GET_EVENTS_ERROR, payload: err });
    });
};

export const getSingleEvent = eventId => dispatch => {
  dispatch({ type: ActionTypes.GET_SINGLE_EVENT_START });
  axiosWithAuth()
    .get(`/event/${eventId}`)
    .then(response => {
      dispatch({
        type: ActionTypes.GET_SINGLE_EVENT_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.GET_SINGLE_EVENT_ERROR, payload: err });
    });
};

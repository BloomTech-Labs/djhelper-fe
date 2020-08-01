import axiosWithAuth from '../../utils/axiosWithAuth';
import * as ActionTypes from './actionTypes';
import { getPlaylist } from './action';

export const addEvent = (eventInfo, history) => dispatch => {
  dispatch({ type: ActionTypes.ADD_EVENT_START });
  dispatch({ type: ActionTypes.ADD_TO_SONG_REDUCER_START });

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
      console.log('response2: ', response2);
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

export const editEvent = (eventInfo, event_id) => dispatch => {
  dispatch({ type: ActionTypes.EDIT_EVENT_START });
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
        description: response.data.description,
        notes: response.data.notes
      };
      dispatch({
        type: ActionTypes.EDIT_EVENT_SUCCESS,
        payload: [formattedResponse, event_id]
      });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.EDIT_EVENT_ERROR, payload: err });
    });
};

export const deleteEvent = (event, history) => dispatch => {
  dispatch({ type: ActionTypes.DELETE_EVENT_START });
  // DELETE https://api.dj-helper.com/api/auth/event/:event_id
  history.push('/dj');
  axiosWithAuth()
    .delete(`/auth/event/${event.event_id}`)
    .then(response => {
      dispatch({ type: ActionTypes.DELETE_EVENT_SUCCESS, payload: event });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.DELETE_EVENT_ERROR, payload: err });
    });
};

// getting events by DJ id

export const getEvents = djId => dispatch => {
  // GET https://api.dj-helper.com/api/events
  dispatch({ type: ActionTypes.GET_EVENTS_START });
  axiosWithAuth()
    .get('/events')
    .then(response => {
      const filteredEvents = response.data.filter(
        event => event.dj_id === djId
      );
      // const eventsObject = {};
      // filteredEvents.forEach(event => {
      //   eventsObject[`event${event.id}`] = {
      //     event_id: event.id,
      //     name: event.name,
      //     event_type: event.event_type,
      //     description: event.description,
      //     date: event.date,
      //     start_time: event.start_time,
      //     end_time: event.end_time,
      //     location_id: event.location_id,
      //     img_url: event.img_url,
      //     dj_id: event.dj_id,
      //     notes: event.notes
      //   };
      //   dispatch(getPlaylist(event.id));
      // });
      dispatch({
        type: ActionTypes.GET_EVENTS_SUCCESS,
        payload: filteredEvents
      });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.GET_EVENTS_ERROR, payload: err });
    });
};

export const getEvent = event_id => dispatch => {
  // GET https://api.dj-helper.com/api/event/:event_id
  dispatch({ type: ActionTypes.GET_EVENT_START });
  axiosWithAuth()
    .get(`/event/${event_id}`)
    .then(response => {
      const eventObject = {
        event_id: response.data.id,
        name: response.data.name,
        event_type: response.data.event_type,
        description: response.data.description,
        date: response.data.date,
        start_time: response.data.start_time,
        end_time: response.data.end_time,
        location_id: response.data.location_id,
        img_url: response.data.img_url,
        dj_id: response.data.dj_id,
        notes: response.data.notes
      };
      dispatch(getPlaylist(event_id));
      dispatch({
        type: ActionTypes.GET_EVENT_SUCCESS,
        payload: [eventObject, event_id]
      });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.GET_EVENT_ERROR, payload: err });
    });
};

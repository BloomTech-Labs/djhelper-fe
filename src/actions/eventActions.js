import { axiosWithAuth } from '../utils/axiosWithAuth';
import {
  ADD_TO_SONG_REDUCER_START,
  ADD_TO_SONG_REDUCER_SUCCESS,
  getPlaylist
} from './action';

// events actions

export const GET_EVENTS_START = 'GET_EVENTS_START';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_ERROR = 'GET_EVENTS_ERROR';

export const GET_EVENT_START = 'GET_EVENT_START';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_ERROR = 'GET_EVENT_ERROR';

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

export const GET_LOCATION_START = 'GET_LOCATION_START';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_LOCATION_ERROR = 'GET_LOCATION_ERROR';

export const EDIT_LOCATION_START = 'EDIT_LOCATION_START';
export const EDIT_LOCATION_SUCCESS = 'EDIT_LOCATION_SUCCESS';
export const EDIT_LOCATION_ERROR = 'EDIT_LOCATION_ERROR';

// events action creators

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
    img_url: eventInfo.location_img_url,
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
        dj_id: eventInfo.dj_id,
        notes: eventInfo.notes,
        img_url: eventInfo.img_url
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
          dispatch({
            type: ADD_EVENT_SUCCESS,
            payload: {
              ...response2.data,
              event_id: response2.data.id
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
        description: response.data.description,
        notes: response.data.notes
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

// getting events by DJ id

export const getEvents = dj_id => dispatch => {
  // GET https://api.dj-helper.com/api/events
  dispatch({ type: GET_EVENTS_START });
  axiosWithAuth()
    .get('/events')
    .then(response => {
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
          img_url: event.img_url,
          dj_id: event.dj_id,
          notes: event.notes
        };
        dispatch(getPlaylist(event.id));
      });
      dispatch({ type: GET_EVENTS_SUCCESS, payload: eventsObject });
    })
    .catch(err => {
      dispatch({ type: GET_EVENTS_ERROR, payload: err });
    });
};

export const getEvent = event_id => dispatch => {
  // GET https://api.dj-helper.com/api/event/:event_id
  dispatch({ type: GET_EVENT_START });
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
      dispatch({ type: GET_EVENT_SUCCESS, payload: [eventObject, event_id] });
    })
    .catch(err => {
      dispatch({ type: GET_EVENT_ERROR, payload: err });
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

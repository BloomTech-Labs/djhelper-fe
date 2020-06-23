/* eslint-disable import/prefer-default-export */
// import { allEvents } from '../data/allEvents';  // Uncomment if you want to use dummy data

// actions
import {
  SET_NAME,
  SET_USERNAME,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER_START,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  EDIT_USER_START,
  EDIT_USER_START_PROCESSING,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  EDIT_USER_CANCEL,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_DJ_START,
  GET_DJ_SUCCESS,
  GET_DJ_ERROR
} from '../actions/action';

import {
  ADD_EVENT_START,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_ERROR,
  EDIT_EVENT_START,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_ERROR,
  DELETE_EVENT_START,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_ERROR,
  ADD_LOCATION_START,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,
  GET_EVENTS_START,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR,
  GET_EVENT_START,
  GET_EVENT_SUCCESS,
  GET_EVENT_ERROR,
  GET_LOCATION_START,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_ERROR,
  EDIT_LOCATION_START,
  EDIT_LOCATION_SUCCESS,
  EDIT_LOCATION_ERROR
} from '../actions/eventActions';

const initialState = {
  username: '',
  name: '',
  email: '',
  phone: '',
  website: '',
  id: '',
  bio: '',
  profile_img_src: '',
  events: { active: '' }, // { ...allEvents, active: '' }, // if you want to use dummy data
  locations: [],
  registerUserStart: false,
  registerUserError: false,
  loginUserStart: false,
  loginUserError: false,
  logoutUserStart: false,
  logoutUserError: false,
  tokenPresent: false, // Consider using !!localStorage.getItem('token')
  deleteUserStart: false,
  deleteUserError: false,
  editUserStart: false,
  editUserError: false,
  editUserProcessing: false,
  addEventStart: false,
  addEventError: false,
  editEventStart: false,
  editEventError: false,
  deleteEventStart: true,
  deleteEventError: false,
  addLocationStart: false,
  addLocationError: false,
  getDJError: false,
  getDJStart: false,
  getEventsStart: false,
  getEventsError: false,
  getLocationStart: false,
  getLocationError: false,
  editLocationStart: false,
  editLocationError: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_USERNAME:
      return { ...state, username: action.payload };

    case REGISTER_USER_START:
      return { ...state, registerUserStart: true };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerUserStart: false,
        name: action.payload.name,
        username: action.payload.username,
        id: action.payload.id,
        email: action.payload.email
      };

    case REGISTER_USER_ERROR:
      return { ...state, registerUserStart: false, registerUserError: true };

    case LOGIN_USER_START:
      return { ...state, loginUserStart: true };

    case LOGIN_USER_SUCCESS:
     
      return {
        ...state,
        tokenPresent: true,
        loginUserStart: false,
        name: action.payload.name,
        username: action.payload.username,
        id: action.payload.id,
        email: action.payload.email,
        website: action.payload.website,
        phone: action.payload.phone,
        profile_pic_url: action.payload.profile_pic_url,
        bio: action.payload.bio
      };

    case LOGIN_USER_ERROR:
      return { ...state, loginUserStart: false, loginUserError: true };

    case LOGOUT_USER_START:
      return { ...state, logoutUserStart: true };

    case LOGOUT_USER_SUCCESS:
      return { ...initialState, tokenPresent: false };

    case LOGOUT_USER_ERROR:
      return { ...state, logoutUserStart: false, logoutUserError: true };

    case DELETE_USER_START:
      return { ...state, deleteUserStart: true };

    case DELETE_USER_SUCCESS:
      return initialState;

    case DELETE_USER_ERROR:
      return { ...state, deleteUserStart: false, deleteUserError: true };

    case EDIT_USER_START:
      return { ...state, editUserStart: true };

    case EDIT_USER_SUCCESS:
      return {
        ...state,
        editUserStart: false,
        editUserProcessing: false,
        name: action.payload.name,
        username: action.payload.username,
        id: action.payload.id,
        email: action.payload.email,
        website: action.payload.website,
        phone: action.payload.phone,
        profile_pic_url: action.payload.profile_pic_url,
        bio: action.payload.bio
      };

    case EDIT_USER_ERROR:
      return {
        ...state,
        editUserStart: false,
        editUserProcessing: false,
        editUserError: true
      };

    case EDIT_USER_CANCEL:
      return { ...state, editUserStart: false, editUserError: false };

    case EDIT_USER_START_PROCESSING:
      return { ...state, editUserProcessing: true };

    case UPDATE_USER_START:
      return { ...state, editUserStart: true };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        editUserStart: false,
        website: action.payload.website,
        phone: action.payload.phone,
        profile_pic_url: action.payload.profile_pic_url,
        bio: action.payload.bio
      };

    case UPDATE_USER_ERROR:
      return { ...state, editUserStart: false, editUserError: true };

    case ADD_EVENT_START:
      return { ...state, addEventStart: true };

    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        addEventStart: false,
        events: {
          ...state.events,
          [`event${action.payload.id}`]: action.payload
        }
      };

    case ADD_EVENT_ERROR:
      return {
        ...state,
        addEventStart: false,
        addEventError: true
      };

    case ADD_LOCATION_START:
      return { ...state, addLocationStart: true };

    case ADD_LOCATION_SUCCESS:
      return {
        ...state,
        addLocationStart: false,
        locations: [...state.locations, action.payload]
      };

    case ADD_LOCATION_ERROR:
      return {
        ...state,
        addLocationStart: false,
        addLocationError: true
      };

    case EDIT_EVENT_START:
      return {
        ...state,
        editEventStart: true
      };

    case EDIT_EVENT_SUCCESS:
      return {
        ...state,
        editEventStart: false,
        events: {
          ...state.events,
          [`event${action.payload[1]}`]: action.payload[0]
        }
      };

    case EDIT_EVENT_ERROR:
      return {
        ...state,
        editEventStart: false,
        editEventError: true
      };

    case DELETE_EVENT_START:
      return {
        ...state,
        deleteEventStart: true
      };

    case DELETE_EVENT_SUCCESS:
      const parentKey = 'events';
      const childKey = `event${action.payload.event_id}`;
      const { [parentKey]: parentValue, ...noChild } = state;
      const { [childKey]: removedValue, ...childWithout } = parentValue;
      const stateCopyWithoutEvent = { ...noChild, [parentKey]: childWithout };
      return { ...stateCopyWithoutEvent, deleteEventStart: false };

    case DELETE_EVENT_ERROR:
      return {
        ...state,
        deleteEventStart: false,
        deleteEventError: true
      };

    case GET_DJ_START:
      return {
        ...state,
        getDJStart: true
      };

    case GET_DJ_SUCCESS:
      return {
        ...state,
        getDJStart: false,
        name: action.payload.name,
        username: action.payload.username,
        id: action.payload.id,
        email: action.payload.email,
        website: action.payload.website,
        phone: action.payload.phone,
        profile_pic_url: action.payload.profile_pic_url,
        bio: action.payload.bio
      };

    case GET_DJ_ERROR:
      return {
        ...state,
        getDJError: true
      };

    case GET_EVENTS_START:
      return {
        ...state,
        getEventsStart: true
      };

    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        getEventsStart: false,
        events: { ...state.events, ...action.payload }
      };

    case GET_EVENTS_ERROR:
      return {
        ...state,
        getEventsError: true,
        getEventsStart: false
      };

    case GET_EVENT_START:
      return {
        ...state,
        getEventsStart: true
      };

    case GET_EVENT_SUCCESS:
      return {
        ...state,
        getEventsStart: false,
        events: {
          ...state.events,
          [`event${action.payload[1]}`]: action.payload[0]
        }
      };

    case GET_EVENT_ERROR:
      return {
        ...state,
        getEventsError: true,
        getEventsStart: false
      };

    case GET_LOCATION_START:
      return {
        ...state,
        getLocationStart: true
      };

    case GET_LOCATION_SUCCESS:
      const filteredLocations2 = state.locations.filter(
        location => location.id !== action.payload.id
      );
      return {
        ...state,
        getLocationStart: false,
        locations: [...filteredLocations2, action.payload] // [...state.locations, action.payload]
      };

    case GET_LOCATION_ERROR:
      return {
        ...state,
        getLocationError: true
      };

    case EDIT_LOCATION_START:
      return {
        ...state,
        getLocationStart: true
      };

    case EDIT_LOCATION_SUCCESS:
      const filteredLocations = state.locations.filter(
        location => location.id !== action.payload.id
      );
      return {
        ...state,
        locations: [...filteredLocations, action.payload],
        getLocationStart: false
      };

    case EDIT_LOCATION_ERROR:
      return {
        ...state,
        getLocationError: true
      };

    default:
      return state;
  }
};

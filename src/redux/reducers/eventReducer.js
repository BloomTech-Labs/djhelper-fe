/* eslint-disable import/prefer-default-export */
// import { allEvents } from '../data/allEvents';  // Uncomment if you want to use dummy data
import { EventInitialState } from './initialState';
import * as ActionTypes from '../actions/actionTypes';

export const eventReducer = (state = EventInitialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_EVENT_START:
      return { ...state, addEventStart: true };

    case ActionTypes.ADD_EVENT_SUCCESS:
      return {
        ...state,
        addEventStart: false,
        events: [...state.events, action.payload]
      };

    case ActionTypes.ADD_EVENT_ERROR:
      return {
        ...state,
        addEventStart: false,
        addEventError: true
      };

    case ActionTypes.EDIT_EVENT_START:
      return {
        ...state,
        editEventStart: true
      };

    case ActionTypes.EDIT_EVENT_SUCCESS:
      return {
        ...state,
        editEventStart: false,
        events: {
          ...state.events,
          [`event${action.payload[1]}`]: action.payload[0]
        }
      };

    case ActionTypes.EDIT_EVENT_ERROR:
      return {
        ...state,
        editEventStart: false,
        editEventError: true
      };

    case ActionTypes.DELETE_EVENT_START:
      return {
        ...state,
        deleteEventStart: true
      };

    case ActionTypes.DELETE_EVENT_SUCCESS:
      const parentKey = 'events';
      const childKey = `event${action.payload.event_id}`;
      const { [parentKey]: parentValue, ...noChild } = state;
      const { [childKey]: removedValue, ...childWithout } = parentValue;
      const stateCopyWithoutEvent = { ...noChild, [parentKey]: childWithout };
      return { ...stateCopyWithoutEvent, deleteEventStart: false };

    case ActionTypes.DELETE_EVENT_ERROR:
      return {
        ...state,
        deleteEventStart: false,
        deleteEventError: true
      };

    case ActionTypes.GET_EVENTS_START:
      return {
        ...state,
        getEventsStart: true
      };

    case ActionTypes.GET_EVENTS_SUCCESS:
      return {
        ...state,
        getEventsStart: false,
        events: [...state.events, ...action.payload]
      };

    case ActionTypes.GET_EVENTS_ERROR:
      return {
        ...state,
        getEventsError: true,
        getEventsStart: false
      };

    case ActionTypes.GET_SINGLE_EVENT_START:
      return {
        ...state,
        getEventsStart: true
      };

    case ActionTypes.GET_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        getEventsStart: false,
        singleEvent: { ...state.singleEvent, ...action.payload }
      };

    case ActionTypes.GET_SINGLE_EVENT_ERROR:
      return {
        ...state,
        getEventsError: true,
        getEventsStart: false
      };

    default:
      return state;
  }
};

/* eslint-disable import/prefer-default-export */
// import { allEvents } from '../data/allEvents';  // Uncomment if you want to use dummy data
import { SearchInitialState } from './initialState';
import * as ActionTypes from '../actions/actionTypes';

export const searchReducer = (state = SearchInitialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      };
    case ActionTypes.GET_PREDICT_RESULTS_SUCCESS:
      return {
        ...state,
        predictResults: action.payload
      };
    case ActionTypes.GET_TRACK_LIST:
      return {
        ...state,
        // trackList: [...state.trackList, ...action.payload]
        trackList: action.payload
      };
    case ActionTypes.GET_TRACK_LIST_ERROR:
      return {
        ...state,
        getTrackListError: action.payload
      };
    case ActionTypes.ADD_SEARCH_TRACK:
      console.log('action payload: ', action.payload);
      return {
        ...state,
        trackList: [...state.trackList, action.payload],
        searchResults: state.searchResults.filter(
          track => track.song_name !== action.payload.name
        )
      };
    case ActionTypes.ADD_SEARCH_TRACK_ERROR:
      return {
        ...state,
        addTrackError: action.payload
      };
    case ActionTypes.DELETE_TRACK_SUCCESS:
      console.log('delete payload: ', action.payload);
      return {
        ...state,
        trackList: state.trackList.filter(track => track.id !== action.payload)
      };
    case ActionTypes.DELETE_TRACK_ERROR:
      return {
        ...state,
        deleteTrackError: action.payload
      };
    default:
      return state;
  }
};

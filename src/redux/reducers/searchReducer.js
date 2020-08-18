/* eslint-disable import/prefer-default-export */
// import { allEvents } from '../data/allEvents';  // Uncomment if you want to use dummy data
import { SearchInitialState } from './initialState';
import * as ActionTypes from '../actions/actionTypes';

export const searchReducer = (state = SearchInitialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_SEARCH_RESULTS_START:
      return {
        ...state,
        getSearchResultStart: true
      };
    case ActionTypes.GET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
        getSearchResultStart: false
      };
    case ActionTypes.GET_SEARCH_RESULTS_ERROR:
      return {
        ...state,
        getSearchResultsError: action.payload,
        getSearchResultStart: false
      };
    case ActionTypes.GET_PREDICT_RESULTS_SUCCESS:
      return {
        ...state,
        predictResults: action.payload
      };
    case ActionTypes.GET_TRACK_LIST:
      return {
        ...state,
        trackList: [...state.trackList, ...action.payload]
        // trackList: action.payload
      };
    case ActionTypes.GET_TRACK_LIST_ERROR:
      return {
        ...state,
        getTrackListError: action.payload
      };
    case ActionTypes.ADD_SEARCH_TRACK:
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
      return {
        ...state,
        trackList: state.trackList.filter(track => track.id !== action.payload)
      };
    case ActionTypes.DELETE_TRACK_ERROR:
      return {
        ...state,
        deleteTrackError: action.payload
      };
    case ActionTypes.MOVE_TRACK_SUCCESS:
      return {
        ...state,
        playlistResults: [...state.playlistResults, action.payload],
        trackList: state.trackList.filter(track => track.id !== action.trackId)
      };
    case ActionTypes.MOVE_TRACK_ERROR:
      return {
        ...state,
        moveTrackError: action.payload
      };
    case ActionTypes.GET_PLAYLISTS_SUCCESS:
      return {
        ...state,
        playlistResults: [...state.playlistResults, ...action.payload]
      };
    case ActionTypes.GET_PLAYLISTS_ERROR:
      return {
        ...state,
        getPlaylistError: action.payload
      };
    case ActionTypes.REMOVE_PLAYLIST_TRACK_SUCCESS:
      return {
        ...state,
        playlistResults: state.playlistResults.filter(
          track => track.id !== action.payload
        )
      };
    case ActionTypes.REMOVE_PLAYLIST_TRACK_ERRROR:
      return {
        ...state,
        removePlaylistTrackError: action.payload};
    case ActionTypes.ADD_VOTE_SUCCESS:
     
          return{
            ...state,
            trackList: state.trackList.map(track => ({...track, votes: action.payload.votes}))
          };
    case ActionTypes.ADD_VOTE_TRACK_ERROR:
          return{
            ...state,
            addVoteTrackError: action.payload

          };
    default:
      return state;
        }
      };

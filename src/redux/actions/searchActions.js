import axiosWithAuth from '../../utils/axiosWithAuth';
import * as ActionTypes from './actionTypes';

export const getSearchResults = (value, isExplicit) => dispatch => {
  dispatch({
    type: ActionTypes.GET_SEARCH_RESULTS_START
  });
  axiosWithAuth()
    .get(`/track/${value}`)
    .then(res => {
      const resultArrays = Object.keys(res.data).map(i => res.data[i]);
      console.log('array2: ', resultArrays);
      let filteredResults = [];
      if (isExplicit) {
        filteredResults = resultArrays;
      } else {
        filteredResults = resultArrays.filter(
          search => search.explicit === isExplicit
        );
      }

      dispatch({
        type: ActionTypes.GET_SEARCH_RESULTS,
        payload: filteredResults
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_SEARCH_RESULTS_ERROR,
        payload: err
      });
    });
};

export const getPredictionResults = (spotifyId, isExplicit) => dispatch => {
  axiosWithAuth()
    .get(`/predict/${spotifyId}`)
    .then(res => {
      const resultArrays = Object.keys(res.data).map(i => res.data[i]);
      let filteredResults = [];
      if (isExplicit) {
        filteredResults = resultArrays;
      } else {
        filteredResults = resultArrays.filter(
          search => search.explicit === isExplicit
        );
      }

      dispatch({
        type: ActionTypes.GET_PREDICT_RESULTS_SUCCESS,
        payload: filteredResults
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_PREDICT_RESULTS_ERROR,
        payload: err
      });
    });
};

export const getTrackList = id => dispatch => {
  axiosWithAuth()
    .get(`/event/${id}/tracks`)
    .then(res => {
      dispatch({
        type: ActionTypes.GET_TRACK_LIST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.GET_TRACK_LIST_ERROR,
        payload: err
      });
    });
};
export const addVotes = trackId => dispatch => {
  return axiosWithAuth()
    .post(`/auth/vote`, { trackId: trackId })
    .then(votes => {
      dispatch({ type: ActionTypes.ADD_VOTE_SUCCESS, payload: votes.data });
    })
    .catch(err => {
      dispatch({
        type: ActionTypes.ADD_VOTE_TRACK_ERROR,
        payload: err
      });
    });
};

export const addTrackResult = (value, eventId) => dispatch => {
  const newTrack = {
    spotify_id: value.id,
    name: value.song_name,
    artist_name: value.artist_name,
    url: value.external_urls,
    isExplicit: value.explicit,

    preview: value.preview,
    img: value.image,
    event_id: eventId
  };

  return axiosWithAuth()
    .get(`/event/${eventId}/tracks`)
    .then(res => {
      if (res.data.filter(track => track.name === newTrack.name).length > 0) {
        return { ...newTrack, isExists: true };
      }

      return axiosWithAuth()
        .get(`/event/${eventId}/playlist`)
        .then(res3 => {
          if (
            res3.data.filter(track => track.name === newTrack.name).length > 0
          ) {
            return { ...newTrack, isExists: true };
          }

          return axiosWithAuth()
            .post('/track/', newTrack)
            .then(res2 => {
              dispatch({
                type: ActionTypes.ADD_SEARCH_TRACK,
                payload: res2.data
              });

              return res2.data;
            })
            .catch(err => {
              dispatch({
                type: ActionTypes.ADD_SEARCH_TRACK_ERROR,
                payload: err
              });
            });
        });
    })
    .catch();
};

export const deleteTrack = id => dispatch => {
  axiosWithAuth()
    .delete(`/auth/track/${id}`)
    .then(res => {
      dispatch({ type: ActionTypes.DELETE_TRACK_SUCCESS, payload: id });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.DELETE_TRACK_ERROR, payload: err });
    });
};

//actions
import {
    SEARCH_FOR_TRACK_START,
    SEARCH_FOR_TRACK_SUCCESS,
    SEARCH_FOR_TRACK_ERROR,

    ADD_SONG_TO_PLAYLIST_START,
    ADD_SONG_TO_PLAYLIST_SUCCESS,
    ADD_SONG_TO_PLAYLIST_ERROR,

    ADD_TO_SONG_REDUCER_START,
    ADD_TO_SONG_REDUCER_SUCCESS,
    ADD_TO_SONG_REDUCER_ERROR,

    ADD_VOTE_START,
    ADD_VOTE_SUCCESS,
    ADD_VOTE_ERROR,


} from '../actions/action'

const initialState = {
  results: [],
  eventPlaylists: {
    event1: {
      playlist: [],
      requests: []
    },
    event2: {
      playlist: [],
      requests: []
    },
    event3: {
      playlist: [],
      requests: []
    },
    event4: {
      playlist: [],
      requests: []
    },
    event5: {
      playlist: [],
      requests: []
    },
    event6: {
      playlist: [],
      requests: []
    }
  },
    addToSongReducerStarted: false,
    searchStarted: false,
    searchError: false,
    getPreviewStarted: false,
    getPreviewError: false,
    addSongStarted: false,
    addSongError: false,
    addVoteStarted: false,
    addVoteError: false,
    currentPreview: '',

}

export const songReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_SONG_REDUCER_START:
            return {...state, addToSongReducerStarted: true}
        case ADD_TO_SONG_REDUCER_SUCCESS:
            return {...state, eventPlaylists: {
                ...state.eventPlaylists,addToSongReducerStarted: false, [`event${action.payload}`]: {
                    playlist: [],
                    requests: []
                }
        }}
        case SEARCH_FOR_TRACK_START:
            return {...state, searchStarted: true};
        case SEARCH_FOR_TRACK_SUCCESS:
            return {...state, results: action.payload}

        case SEARCH_FOR_TRACK_ERROR:
          return { ...state, searchError: true };
        case ADD_SONG_TO_PLAYLIST_START:
                return {...state, addSongStarted: true};

        case ADD_SONG_TO_PLAYLIST_SUCCESS:
            let id = action.payload.event_id;
            let song = action.payload.songInfo;
            let songArr = state.eventPlaylists[`event${id}`].playlist;
            let newSongArr = songArr.concat(song);

            if (songArr.length > 0) {
                for (var i = 0; i < songArr.length; i++ ) {
                    if (songArr[i]['id'] === song.id) {
                        newSongArr=songArr;
                        break;
                    }
                }
            }

            return {...state, addSongStarted: false, eventPlaylists:
                {...state.eventPlaylists,
                    [`event${id}`]: {
                        ...state.eventPlaylists[`event${id}`],
                            playlist: newSongArr
                    }
            }}
        case ADD_VOTE_START:
            return {...state, addVoteStarted: true};

        case ADD_VOTE_SUCCESS:
            let event_id = action.payload.event_id;
            let song_id = action.payload.song_id;
            let tracks = state.eventPlaylists[`event${event_id}`].playlist;

            let songToChange;
            let songToChangeIndex;
            for (var i = 0; i < tracks.length; i++ ) {
                if (tracks[i]['id'] === song_id) {
                    songToChange = tracks[i];
                    songToChangeIndex = i;
                }
            }
            let updatedVote = {...songToChange, votes: songToChange['votes'] + 1};
            let newTracks = [...tracks];
            newTracks[songToChangeIndex] = updatedVote


           return {...state, addVoteStarted: false, eventPlaylists:
                {...state.eventPlaylists,
                    [`event${event_id}`]: {
                        ...state.eventPlaylists[`event${event_id}`],
                            playlist: newTracks
                    }
            }}



        default:
            return state;
    }
};

//actions
import {
    SEARCH_FOR_TRACK_START,
    SEARCH_FOR_TRACK_SUCCESS,
    SEARCH_FOR_TRACK_ERROR,

    ADD_SONG_TO_PLAYLIST_START,
    ADD_SONG_TO_PLAYLIST_SUCCESS,
    ADD_SONG_TO_PLAYLIST_ERROR,

    GET_TRACK_PREVIEW_START,
    GET_TRACK_PREVIEW_SUCCESS,
    GET_TRACK_PREVIEW_ERROR,

    ADD_TO_SONG_REDUCER_START,
    ADD_TO_SONG_REDUCER_SUCCESS,
    ADD_TO_SONG_REDUCER_ERROR,


} from '../actions/action'

const initialState = {
    results: [],
    eventPlaylists: {
        event1: {
            playlist: [],
            requests:[]
        },
        event2: {
            playlist: [],
            requests:[]
        },
        event3: {
            playlist: [],
            requests:[]
        },
        event4: {
            playlist: [],
            requests:[]
        },
        event5: {
            playlist: [],
            requests:[]
        },
        event6: {
            playlist: [],
            requests:[]
        },
    },
    addToSongReducerStarted: false,
    searchStarted: false,
    searchError: false,
    getPreviewStarted: false,
    getPreviewError: false,
    addSongStarted: false,
    addSongError: false,
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
            return {...state, searchError: true}

        case GET_TRACK_PREVIEW_START:
            return {...state, getPreviewStarted: true }

        case GET_TRACK_PREVIEW_SUCCESS:
            console.log(action.payload);
            return {...state, getPreviewStarted: false, currentPreview: action.payload.preview_url};

        case GET_TRACK_PREVIEW_ERROR:
            return {...state, getPreviewStarted: false, getPreviewError: true};

        case ADD_SONG_TO_PLAYLIST_START:
            return {...state, addSongStarted: true};

        case ADD_SONG_TO_PLAYLIST_SUCCESS:
            let id = action.payload.event_id;
            let song = action.payload.songInfo;
            let songArr = state.eventPlaylists[`event${id}`].playlist;
            let newSongArr = songArr.concat(song);
            console.log(newSongArr);
            return {...state, addSongStarted: false, eventPlaylists:
                {...state.eventPlaylists,
                    [`event${id}`]: {
                        ...state.eventPlaylists[`event${id}`],
                            playlist: newSongArr
                    }
            }}
        default:
            return state;
    }
};

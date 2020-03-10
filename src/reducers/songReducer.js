//actions
import {
    SEARCH_FOR_TRACK_START,
    SEARCH_FOR_TRACK_SUCCESS,
    SEARCH_FOR_TRACK_ERROR

} from '../actions/action'

const initialState = {
    results: [],
    searchStarted: false,
    searchError: false,
}

export const songReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_FOR_TRACK_START:
            return {...state, searchStarted: true};
        case SEARCH_FOR_TRACK_SUCCESS:
            return {...state, results: action.payload}

        case SEARCH_FOR_TRACK_ERROR:
            return {...state, searchError: true}

        default:
            return state;
    }
};

//actions
import {
    SET_NAME,
    SET_USERNAME
} from '../actions/action'

const initialState = {
    username: 'djtester',
    name: 'DJ Tester'
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_NAME:
            return {...state, name: action.payload};
        case SET_USERNAME:
            return {...state, username: action.payload}
    
        default:
            return state;
    }
};
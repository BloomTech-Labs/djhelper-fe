//actions
import {
    SET_NAME,
    SET_USERNAME,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR
} from '../actions/action'

const initialState = {
    username: 'djtester',
    name: 'DJ Tester',
    registerUserStart: false,
    registerUserError: false,
    infoNeeded: {}
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_NAME:
            return {...state, name: action.payload};
        case SET_USERNAME:
            return {...state, username: action.payload}

        case REGISTER_USER_START:
            return {...state, registerUserStart: true}

        case REGISTER_USER_SUCCESS:
            return {...state, registerUserStart: false, infoNeeded: action.payload }

        case REGISTER_USER_ERROR:
            return {...state, registerUserStart: false, registerUserError: true}

        default:
            return state;
    }
};

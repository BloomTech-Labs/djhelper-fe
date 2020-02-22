//actions
import {
    SET_NAME,
    SET_USERNAME,

    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,

    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR

} from '../actions/action'

const initialState = {
    username: '',
    name: '',
    phone: '',
    website: '',
    id: '',
    registerUserStart: false,
    registerUserError: false,
    loginUserStart: false,
    loginUserError: false
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
            return {...state, 
                registerUserStart: false, 
                name: action.payload.user.name,
                username: action.payload.user.username
            }

        case REGISTER_USER_ERROR:
            return {...state, 
                registerUserStart: false, 
                registerUserError: true
            }

        case LOGIN_USER_START:
            return {...state, loginUserStart: true}

        case LOGIN_USER_SUCCESS:
            return {...state, 
                loginUserStart: false, 
                name: action.payload.user.name,
                username: action.payload.user.username,
                id: action.payload.user.id
            }

        case LOGIN_USER_ERROR:
            return {...state, loginUserStart: false, loginUserError: true}

        default:
            return state;
    }
};

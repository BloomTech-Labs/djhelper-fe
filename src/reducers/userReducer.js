//actions
import {
    SET_NAME,
    SET_USERNAME,

    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,

    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,

    LOGOUT_USER_START,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_ERROR

} from '../actions/action'

const initialState = {
    username: '',
    name: '',
    email: '',
    phone: '',
    website: '',
    id: '',
    registerUserStart: false,
    registerUserError: false,
    loginUserStart: false,
    loginUserError: false,
    logoutUserStart: false,
    logoutUserError: false,
    tokenPresent: false,
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
                username: action.payload.user.username,
                id: action.payload.user.id,
                email: action.payload.user.email,
                website: action.payload.user.profile_img_src,
                phone: action.payload.user.phone_number
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
                tokenPresent: true,
                loginUserStart: false,
                name: action.payload.user.name,
                username: action.payload.user.username,
                id: action.payload.user.id,
                email: action.payload.user.email,
                website: action.payload.user.profile_img_src,
                phone: action.payload.user.phone_number
            }

        case LOGIN_USER_ERROR:
            return {...state, loginUserStart: false, loginUserError: true
            }

        case LOGOUT_USER_START:
            return {...state, logoutUserStart: true}

        case LOGOUT_USER_SUCCESS:
            return initialState;

        case LOGOUT_USER_ERROR:
            return {...state, logoutUserStart: false, logoutUserError: true}

        default:
            return state;
    }
};

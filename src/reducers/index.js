import { combineReducers } from 'redux';
import { userReducer } from './userReducer.js';
import { songReducer } from './songReducer.js';

const rootReducer = combineReducers({userReducer, songReducer});

export default rootReducer;

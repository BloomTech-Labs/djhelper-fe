import { combineReducers } from 'redux';
import { userReducer } from './userReducer.js';

const rootReducer = combineReducers({userReducer: userReducer});

export default rootReducer;
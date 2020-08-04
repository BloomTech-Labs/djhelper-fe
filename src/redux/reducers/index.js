import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { songReducer } from './songReducer';
import { eventReducer } from './eventReducer';

const rootReducer = combineReducers({ userReducer, songReducer, eventReducer });

export default rootReducer;

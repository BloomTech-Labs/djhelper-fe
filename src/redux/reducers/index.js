import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
// import { songReducer } from './songReducer';
import { eventReducer } from './eventReducer';
import { searchReducer } from './searchReducer';

const rootReducer = combineReducers({
  userReducer,
  eventReducer,
  searchReducer
});

export default rootReducer;

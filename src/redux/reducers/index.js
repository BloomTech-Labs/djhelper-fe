import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
// import { songReducer } from './songReducer';
import { eventReducer } from './eventReducer';
import { searchReducer } from './searchReducer';
import { modalReducer } from './modalReducer';

const rootReducer = combineReducers({
  userReducer,
  eventReducer,
  searchReducer,
  modalReducer
});

export default rootReducer;

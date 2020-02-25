import { compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { createStore } from 'redux';
import  rootReducer from '../reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));



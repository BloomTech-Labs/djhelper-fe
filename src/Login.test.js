import React from 'react';
import {waitForElement, debug, render, fireEvent, cleanup, wrapper, find, queries } from '@testing-library/react';
import App from './components/Home';
import Login from './components/Login';
import {Provider, useSelector} from "react-redux";
import { compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createMemoryHistory } from 'history'
import { Router, BrowserRouter } from 'react-router-dom'

import { createStore } from 'redux';
import  rootReducer from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

test('Login page renders correctly', () => {
  const history = createMemoryHistory()
  history.push('/login')
  const simulatedDom = render(
        <Provider store={store} >
            <Router history={history}>
                    <App />
            </Router>
        </Provider>
  );
  const header = simulatedDom.queryByText('Welcome back!');
  const username = simulatedDom.queryByText('Username:');
  const password = simulatedDom.queryByText('Password:');
  const submit = simulatedDom.queryByText('Submit');


  expect(header).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});

import React from 'react';
import {waitForElement, debug, render, fireEvent, cleanup, wrapper, find, queries } from '@testing-library/react';
import App from './components/Home';
import Login from './components/Login';
import {Provider, useSelector} from "react-redux";
import { compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createMemoryHistory } from 'history'
import { Router, BrowserRouter, MemoryRouter } from 'react-router-dom'
import $ from "jquery";

import { createStore } from 'redux';
import  rootReducer from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

test('Login page renders correctly', () => {
  const history = createMemoryHistory()
  const {container,queryByText, getByText} = render(
        <Provider store={store} >
            <Router history={history}>
                <Login />
            </Router>
        </Provider>
  );

  const header = queryByText('Welcome back!');
  const username = getByText('Username:');
  const password = getByText('Password:');
  const submit = getByText('Submit');


  expect(header).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});

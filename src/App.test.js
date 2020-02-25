import React from 'react';
import {debug, render, fireEvent, cleanup } from '@testing-library/react';
import App from './components/Home';
import {Provider, useSelector} from "react-redux";
import { compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createMemoryHistory } from 'history'
import { Router} from 'react-router-dom'

import { createStore } from 'redux';
import  rootReducer from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));


test('App component renders to Homepage', () => {
  const history = createMemoryHistory()
  const {container,queryByText, getByText} = render(
        <Provider store={store} >
            <Router history={history}>
                <App />
            </Router>
        </Provider>
  );

  const currentUrl = history.entries[0].pathname;
  expect(currentUrl).toMatch('/');

});

test('Login link sends user to the login page', () => {
  const history = createMemoryHistory()
  const {container,queryByText, getByText} = render(
        <Provider store={store} >
            <Router history={history}>
                <App />
            </Router>
        </Provider>
  );

  fireEvent.click(getByText(/log in/i));

  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/login');

});

test('Register link sends user to the register page', () => {
  const history = createMemoryHistory()
  const {container,queryByText, getByText} = render(
        <Provider store={store} >
            <Router history={history}>
                <App />
            </Router>
        </Provider>
  );

  fireEvent.click(getByText(/register/i));

  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/register');

});

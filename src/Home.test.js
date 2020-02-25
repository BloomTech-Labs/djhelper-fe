import React from 'react';
import ReactTestUtils, {mount} from 'react-dom/test-utils';
import {debug, render, fireEvent, cleanup} from '@testing-library/react';
import Home from './components/Home';
import Register from './components/Register';
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


test('Home page renders links for register and login', async () => {
  const history = createMemoryHistory()
  const simulatedDom = render(
      <Router history={history}>
        <Provider store={store} >
            <Home />
        </Provider>
      </Router>
  );
  const register = simulatedDom.queryByText('register');
  const login = simulatedDom.queryByText('log in');

  expect(register).toBeInTheDocument();
  expect(login).toBeInTheDocument();
});

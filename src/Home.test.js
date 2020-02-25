import React from 'react';
import ReactTestUtils, {mount} from 'react-dom/test-utils';
import {waitForElement, debug, render, fireEvent, cleanup, wrapper, find, queries } from '@testing-library/react';
import App from './components/Home';
import Home from './components/Home';
import Register from './components/Register';
import {Provider, useSelector} from "react-redux";
import { compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { createStore } from 'redux';
import  rootReducer from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));


test('Home page renders links for register and login', async () => {
  const history = createMemoryHistory()
  const simulatedDom = render(
        <Provider store={store} >
            <App />
        </Provider>
  );
  const register = simulatedDom.queryByText('register');
  const login = simulatedDom.queryByText('log in');
  const navBar = simulatedDom.queryByDisplayValue('DJ Helper');

  expect(register).toBeInTheDocument();
  expect(login).toBeInTheDocument();
  /*
  const register = getByText(/register/i);
  const login = getByText('log in');
  const navBrand = getByText('DJ Helper');
  expect(register).toBeInTheDocument();
  expect(login).toBeInTheDocument();
  expect(navBrand).toBeInTheDocument();
  */
});

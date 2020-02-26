import React from 'react';
import {debug, render, fireEvent, cleanup } from '@testing-library/react';
import App from '../components/Home';
import {Provider, useSelector} from "react-redux";
import { compose, applyMiddleware } from "redux";
import { createMemoryHistory } from 'history'
import { Router} from 'react-router-dom'
import {store} from "./store";

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
  const {container,queryByText, getByText, getByTestId } = render(
        <Provider store={store} >
            <Router history={history}>
                <App />
            </Router>
        </Provider>
  );
  //TODO: Find way to get this specific instance of 'register'. Line 53 also causes an error.
  fireEvent.click(getByText(/register/i));
  //fireEvent.click(getByTestId('register-nav'));

  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/register');

});

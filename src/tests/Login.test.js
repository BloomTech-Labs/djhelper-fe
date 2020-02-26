import React from 'react';
import {debug, render, fireEvent, cleanup} from '@testing-library/react';
import Login from '../components/Login';
import {Provider, useSelector} from "react-redux";
import { Router, BrowserRouter, MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import {store} from "./store";

test('Login page renders correctly', () => {
  const history = createMemoryHistory()
  const {container,queryByText, getByText, getByLabelText, getByTestId} = render(
        <Provider store={store} >
            <Router history={history}>
                <Login />
            </Router>
        </Provider>
  );

  const header = queryByText('Welcome back!');
  const username = getByText('Username:');
  const password = getByText('Password:');
  //TODO: Now that submit button has text 'Login', find a way to test for that specific instance of 'Login'
  //const submit = getByText('Submit');
  const toRegistration = getByTestId('toRegistration');

  expect(header).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  //expect(submit).toBeInTheDocument();
  expect(toRegistration).toBeInTheDocument();

  //Finding inputs on Login page
  const usernameInput = getByTestId('usernameInput');
  const passwordInput = getByTestId('passwordInput');

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('here link on Login page takes user to registration page', () => {
  const history = createMemoryHistory()
  const {container,queryByText, getByText, getByLabelText, getByTestId} = render(
        <Provider store={store} >
            <Router history={history}>
                <Login />
            </Router>
        </Provider>
  );

  const toRegistration = getByTestId('toRegistration');
  fireEvent.click(toRegistration);
  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/register');
});

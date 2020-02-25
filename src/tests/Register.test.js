import React from 'react';
import {debug, render, fireEvent, cleanup} from '@testing-library/react';
import Register from '../components/Register';
import {Provider, useSelector} from "react-redux";
import { Router, BrowserRouter, MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import {store} from "./store";

test('Register page renders correctly', () => {
  const history = createMemoryHistory()
  const {container,queryByText, getByText, getByLabelText, getByTestId} = render(
        <Provider store={store} >
            <Router history={history}>
                <Register />
            </Router>
        </Provider>
  );

  const form = getByTestId('registerForm');

  const header = queryByText('Know what your audience wants.');
  const name = getByText('Name');
  const email = getByText('Email');
  const username = getByText('Username');
  const password = getByText('Password');
  const confirmPassword = getByText('Confirm Password');
  const addMoreInfo = getByText('Add More Info (Optional)');
  const submit = getByText('Submit');

  expect(form).toBeInTheDocument();
  expect(header).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(confirmPassword).toBeInTheDocument();
  expect(addMoreInfo).toBeInTheDocument();
  expect(submit).toBeInTheDocument();

});

test('here link on Register page takes user to Login page', () => {
  const history = createMemoryHistory()
  const {container,queryByText, getByText, getByLabelText, getByTestId} = render(
        <Provider store={store} >
            <Router history={history}>
                <Register />
            </Router>
        </Provider>
  );

  const toLogin = getByTestId('toLogin');
  fireEvent.click(toLogin);
  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/login');
});
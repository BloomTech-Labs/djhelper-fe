import React from 'react';
import {debug, render, fireEvent, cleanup} from '@testing-library/react';
import Login from '../components/Login';
import {Provider, useSelector} from "react-redux";
import { Router, BrowserRouter, MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import {store} from "./store";

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

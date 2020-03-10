import React from 'react';
import { debug, render, fireEvent, cleanup } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import App from '../App.js';
import { Provider, useSelector } from 'react-redux';
import { Router, BrowserRouter, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { store } from './store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

test('Dashboard page renders correctly', () => {
  const history = createMemoryHistory();
  const {
    container,
    queryByText,
    getByText,
    getByLabelText,
    getByTestId
  } = render(
    <Provider store={store}>
      <Router history={history}>
        <Dashboard />
      </Router>
    </Provider>
  );

  const header = getByTestId('header');
  expect(header).toBeInTheDocument();

  const navBar = getByTestId('navBar');
  expect(navBar).toBeInTheDocument();

  const upcomingHeader = getByText(/Upcoming/i);
  const pastHeader = getByText(/Past Events/i);
  const upcomingEvents = getByTestId('upcoming-carousel');
  const pastEvents = getByTestId('past-carousel');

  expect(upcomingHeader).toBeInTheDocument();
  expect(pastHeader).toBeInTheDocument();
  expect(upcomingEvents).toBeInTheDocument();
  expect(pastEvents).toBeInTheDocument();
});

test('Dashboard page navbar profile icon leads to DJProfile component', () => {
  const history = createMemoryHistory();
  const {
    container,
    queryByText,
    getByText,
    getByLabelText,
    getByTestId
  } = render(
    <Provider store={store}>
      <Router history={history}>
        <Dashboard tokenPresent={true} />
      </Router>
    </Provider>
  );

  const profileButton = getByTestId('profile');
  expect(profileButton).toBeInTheDocument();
  fireEvent.click(profileButton);
  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/dj/profile');
});

test('Dashboard page navbar home icon leads to Dashboard component', () => {
  const history = createMemoryHistory();
  const {
    container,
    queryByText,
    getByText,
    getByLabelText,
    getByTestId
  } = render(
    <Provider store={store}>
      <Router history={history}>
        <Dashboard tokenPresent={true} />
      </Router>
    </Provider>
  );

  const homeButton = getByTestId('home');
  expect(homeButton).toBeInTheDocument();
  fireEvent.click(homeButton);
  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/dj');
});

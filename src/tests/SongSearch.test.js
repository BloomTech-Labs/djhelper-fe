import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { store } from './store';

import SongSearch from '../components/SongSearch';

test('SongSearch renders input', () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <Provider store={store}>
        <SongSearch />
      </Provider>
    </Router>
  );

  const searchInput = getByTestId('songSearch');
  expect(searchInput).toBeInTheDocument();
});

test('SongSearch renders placeholder text', () => {
  const history = createMemoryHistory();
  const { getByPlaceholderText } = render(
    <Router history={history}>
      <Provider store={store}>
        <SongSearch />
      </Provider>
    </Router>
  );

  const searchInput = getByPlaceholderText(/Search artists, tracks.../i);
  expect(searchInput).toBeInTheDocument();
});

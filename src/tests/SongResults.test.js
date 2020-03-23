import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { store } from './store';

import SongResults from '../components/SongResults';

test('SongSearch renders message when there are no results', () => {
  const history = createMemoryHistory();
  const { queryByText } = render(
    <Router history={history}>
      <Provider store={store}>
        <SongResults />
      </Provider>
    </Router>
  );

  const message = queryByText(/Whoops! No results./i);
  expect(message).toBeInTheDocument();
});

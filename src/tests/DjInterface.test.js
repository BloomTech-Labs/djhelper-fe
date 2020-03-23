import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { store } from './store';

import DjInterface from '../components/DjInterface';

test('DjInterface renders top navbar', () => {
  const history = createMemoryHistory();
  const { queryAllByText, queryByText } = render(
    <Router history={history}>
      <Provider store={store}>
        <DjInterface />
      </Provider>
    </Router>
  );

  const NavHeader = queryAllByText(/DJ Helper/i)[0];
  expect(NavHeader).toBeInTheDocument();
});

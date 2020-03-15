import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import EditEvent from '../components/AddEvent';
import { store } from './store';

test('Add Event page renders inputs for event data', async () => {
  const history = createMemoryHistory();
  const simulatedDom = render(
    <Router history={history}>
      <Provider store={store}>
        <EditEvent />
      </Provider>
    </Router>
  );

  const descriptionLabel = simulatedDom.queryByText(/description/i);
  const dateLabel = simulatedDom.queryByText(/date/i);

  expect(descriptionLabel).toBeInTheDocument();
  expect(dateLabel).toBeInTheDocument();
});

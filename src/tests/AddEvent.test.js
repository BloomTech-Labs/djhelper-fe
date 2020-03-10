import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddEvent from '../components/AddEvent';
import { store } from './store';

test('Add Event page renders inputs for event data', async () => {
  const history = createMemoryHistory();
  const simulatedDom = render(
    <Router history={history}>
      <Provider store={store}>
        <AddEvent />
      </Provider>
    </Router>
  );
  const descriptionLabel = simulatedDom.queryByText(/description/i);

  expect(descriptionLabel).toBeInTheDocument();
});

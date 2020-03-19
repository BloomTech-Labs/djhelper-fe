import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Event from '../components/Event';
import Dashboard from '../components/Dashboard';
import { store } from './store';

test('Event components on Dashboard component render all event data', async () => {
  const history = createMemoryHistory();
  const simulatedDom = render(
    <Router history={history}>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </Router>
  );
  let currentUrl;

  const eventButtons = simulatedDom.getAllByTestId(/event-component/i);
  eventButtons.forEach(button => {
      expect(button).toBeInTheDocument();
  })
});


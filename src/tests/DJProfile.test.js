import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { store } from './store';

import DJProfile from '../components/DJProfile';

test('DJProfile renders top navbar', () => {
  const history = createMemoryHistory();
  const { queryAllByText } = render(
    <Router history={history}>
      <Provider store={store}>
        <DJProfile />
      </Provider>
    </Router>
  );

  const NavHeader = queryAllByText(/DJ Helper/i)[0];
  expect(NavHeader).toBeInTheDocument();
});

test("DJProfile displays DJ's information", () => {
  const history = createMemoryHistory();
  const { queryByText } = render(
    <Router history={history}>
      <Provider store={store}>
        <DJProfile />
      </Provider>
    </Router>
  );

  const nameArea = queryByText(/name/i);
  const emailArea = queryByText(/email/i);
  const websiteArea = queryByText(/website/i);
  const phoneArea = queryByText(/phone/i);

  expect(nameArea).toBeInTheDocument();
  expect(emailArea).toBeInTheDocument();
  expect(websiteArea).toBeInTheDocument();
  expect(phoneArea).toBeInTheDocument();
});

test('DJProfile displays functional edit button', () => {
  const history = createMemoryHistory();
  const { queryByText, getByLabelText } = render(
    <Router history={history}>
      <Provider store={store}>
        <DJProfile />
      </Provider>
    </Router>
  );

  const editButton = queryByText(/edit/i);

  expect(editButton).toBeInTheDocument();
  fireEvent.click(editButton);

  const nameInput = getByLabelText(/Name/i);
  const bioInput = getByLabelText(/Bio/i);
  const emailInput = getByLabelText(/Email/i);
  const websiteInput = getByLabelText(/Your Website URL/i);
  const phoneInput = getByLabelText(/Phone Number/i);

  expect(nameInput).toBeInTheDocument();
  expect(bioInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(websiteInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
});

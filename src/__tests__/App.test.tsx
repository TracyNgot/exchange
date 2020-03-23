import React from 'react';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { makeInitialState, mockFn } from '../test/helpers';
import App from '../App';

jest.mock('../store/pockets/pocket-actions', () => ({
  getPockets: (...args: any[]) => mockFn('getPockets', args),
}));

describe('App', () => {
  function renderApp(initialState = makeInitialState()) {
    const store = configureStore()(initialState);
    const result = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    return { result, store };
  }
  it('renders without crashing', () => {
    renderApp();
  });
});

import React from 'react';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import {
  mockFn,
  MockInputNumber,
  MockModal,
  MockSelect,
  MockSpin,
  makeInitialState,
} from '../../../test/helpers';
import { getPockets } from '../../../store/pockets/pocket-actions';
import Widget from '../index';
import { theme } from '../../../utils/theme';
import { state } from '../../../test/mocks';

jest.mock('antd/lib/spin', () => MockSpin);
jest.mock('antd/lib/select', () => MockSelect);
jest.mock('antd/lib/input-number', () => MockInputNumber);
jest.mock('antd/lib/modal', () => MockModal);
jest.mock('../../../hooks/use-on-scroll');
jest.mock('../../../store/pockets/pocket-actions', () => ({
  getPockets: (...args: any[]) => mockFn('getPockets', args),
}));
jest.mock('../../../store/rates/rate-actions', () => ({
  getLatestRates: (...args: any[]) => mockFn('getLatestRates', args),
}));
jest.mock('../../../store/exchanges/exchange-actions', () => ({
  getExchangesByPocket: (...args: any[]) =>
    mockFn('getExchangesByPocket', args),
}));
jest.mock('../../../store/exchange-session/exchange-session-actions', () => ({
  init: (...args: any[]) => mockFn('init', args),
  clear: (...args: any[]) => mockFn('clear', args),
}));

describe('Widget', () => {
  function renderWidget(initialState = makeInitialState()) {
    const store = configureStore()(initialState);
    const result = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Widget />
        </ThemeProvider>
      </Provider>,
    );

    return { ...result, store };
  }

  it('gets pockets', () => {
    const { store } = renderWidget(state);

    expect(store.getActions()).toContainEqual(getPockets());
  });
});

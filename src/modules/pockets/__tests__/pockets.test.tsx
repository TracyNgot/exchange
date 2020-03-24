import React from 'react';
import configureStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render } from '@testing-library/react';
import { cloneDeep } from 'lodash';
import { Provider } from 'react-redux';
import { mocked } from 'ts-jest/utils';

import { theme } from '../../../utils/theme';
import { useOnScroll } from '../../../hooks';
import {
  clear,
  init,
  updatePocketFrom,
  updatePocketFromAmount,
  updatePocketTo,
  updatePocketToAmount,
} from '../../../store/exchange-session/exchange-session-actions';
import {
  createExchange,
  getExchangesByPocket,
} from '../../../store/exchanges/exchange-actions';
import { getPockets } from '../../../store/pockets/pocket-actions';
import { getLatestRates } from '../../../store/rates/rate-actions';
import {
  makeInitialState,
  MockCarousel,
  mockFn,
  MockInputNumber,
  MockModal,
  MockSelect,
  MockSpin,
} from '../../../test/helpers';
import { latestRatesResponse, state, first, second } from '../../../test/mocks';
import Pockets from '../index';

jest.mock('antd/lib/spin', () => MockSpin);
jest.mock('antd/lib/carousel', () => MockCarousel);
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
  createExchange: (...args: any[]) => mockFn('createExchange', args),
}));
jest.mock('../../../store/exchange-session/exchange-session-actions', () => ({
  init: (...args: any[]) => mockFn('init', args),
  clear: (...args: any[]) => mockFn('clear', args),
  updatePocketFrom: (...args: any[]) => mockFn('updatePocketFrom', args),
  updatePocketTo: (...args: any[]) => mockFn('updatePocketTo', args),
  updatePocketToAmount: (...args: any[]) =>
    mockFn('updatePocketToAmount', args),
  updatePocketFromAmount: (...args: any[]) =>
    mockFn('updatePocketFromAmount', args),
}));

describe('Pockets', () => {
  function renderPockets(initialState = makeInitialState()) {
    const store = configureStore()(initialState);
    const result = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Pockets />
        </ThemeProvider>
      </Provider>,
    );

    return { ...result, store };
  }

  it('gets pockets', () => {
    const { store } = renderPockets(state);

    expect(store.getActions()).toContainEqual(getPockets());
  });

  it('gets exchanges', () => {
    const { store } = renderPockets(state);
    expect(store.getActions()).toContainEqual(getExchangesByPocket('1'));
  });

  it('gets exchanges while changing pocket', () => {
    const { store, getByTestId } = renderPockets(state);

    fireEvent.click(getByTestId('slide-1-change'));
    expect(store.getActions()).toContainEqual(getExchangesByPocket('2'));
  });

  it('gets more exchanges while scrolling', () => {
    (window as any).innerHeight = 0;
    const { store } = renderPockets(state);

    const { calls }: any = mocked(useOnScroll).mock;
    calls[calls.length - 1][0]();
    expect(store.getActions()).toContainEqual(
      getExchangesByPocket('1', state.exchanges.after),
    );
  });

  it('shows empty message if no exchanges', () => {
    const stateWithoutExchanges = cloneDeep(state);
    stateWithoutExchanges.exchanges.exchanges = [];
    const { container } = renderPockets(stateWithoutExchanges);

    expect(container).toHaveTextContent('empty.noExchange');
  });

  describe('Language selector', () => {
    it('changes language', () => {
      const { getByTestId } = renderPockets(state);

      fireEvent.change(getByTestId('language-selector'), {
        target: { value: 'fr' },
      });
      expect(localStorage.getItem('pocket-lang')).toEqual('fr');
    });
  });

  describe('Exchange modal', () => {
    it('opens exchange modal, inits exchange session, gets latest rates and clears it after closing', () => {
      const { store, getByTestId } = renderPockets(state);

      fireEvent.click(getByTestId('exchange-1-btn'));
      expect(getByTestId('mock-modal')).toBeDefined();
      expect(store.getActions()).toContainEqual(init(first, second));
      expect(store.getActions()).toContainEqual(getLatestRates('GBP'));
      fireEvent.click(getByTestId('mock-cancel'));
      expect(store.getActions()).toContainEqual(clear());
    });

    it('creates a new exchange', () => {
      const stateWithRates = cloneDeep(state);
      stateWithRates.rates.latestRates = latestRatesResponse.rates;
      const { store, getByTestId, getAllByTestId } = renderPockets(
        stateWithRates,
      );

      fireEvent.click(getByTestId('exchange-1-btn'));
      fireEvent.change(getAllByTestId('input-number').pop() as any, {
        target: { value: 10 },
      });
      fireEvent.change(getAllByTestId('input-number')[0], {
        target: { value: 10 },
      });
      expect(store.getActions()).toContainEqual(
        updatePocketFromAmount(1.092, 10),
      );
      expect(store.getActions()).toContainEqual(
        updatePocketToAmount(1.092, 10),
      );

      fireEvent.change(getByTestId('select-currency-from'), {
        target: { value: 'EUR' },
      });
      fireEvent.change(getByTestId('select-currency-to'), {
        target: { value: 'EUR' },
      });
      expect(store.getActions()).toContainEqual(updatePocketFrom(first));
      expect(store.getActions()).toContainEqual(updatePocketTo(first));

      fireEvent.click(getByTestId('submit-exchange'));

      expect(store.getActions()).toContainEqual(
        createExchange({ amount: 10, from: '1', rate: 1.092, to: '2' } as any),
      );
    });

    it('refreshes rates every 10s', () => {
      jest.useFakeTimers();
      const { store, getByTestId } = renderPockets(state);

      fireEvent.click(getByTestId('exchange-1-btn'));
      expect(store.getActions()[3]).toEqual(getLatestRates('GBP'));

      jest.advanceTimersByTime(10000);
      expect(store.getActions()[4]).toEqual(getLatestRates('GBP'));

      jest.advanceTimersByTime(10000);
      expect(store.getActions()[5]).toEqual(getLatestRates('GBP'));
    });

    it("doesn't gets latest rates if error", () => {
      const stateWithError = cloneDeep(state);
      stateWithError.rates.error = 'error';
      const { store, getByTestId } = renderPockets(stateWithError);

      fireEvent.click(getByTestId('exchange-1-btn'));
      expect(store.getActions().pop()).not.toEqual(getLatestRates('GBP'));
    });
  });
});

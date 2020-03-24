import { makeInitialState } from './helpers';

export const latestRatesResponse = {
  base: 'GBP',
  date: '2018-04-08',
  rates: {
    GBP: 0.87295,
    EUR: 1.092,
    USD: 1.2234,
  },
};

export const pocketsMock: any[] = [
  { currency: 'GBP', amount: 30, id: '1' },
  { currency: 'EUR', amount: 20, id: '2' },
];

export const exchangesMock: any[] = [
  { from: '1', to: '2', rate: 0.7, amount: 4, id: '1' },
  { from: '2', to: '1', rate: 1.24, amount: 5, id: '2' },
];

export const [first, second] = pocketsMock;

export const state: any = makeInitialState();
state.pockets.pockets = pocketsMock;
state.exchanges.exchanges = exchangesMock;
state.exchangesSession.from = first;
state.exchangesSession.fromAmount = 10;
state.exchangesSession.to = second;
state.exchangesSession.isReady = true;
state.exchanges.after = { id: 'after' };

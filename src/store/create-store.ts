import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import converter from './converter/converter-reducer';
import exchanges from './exchanges/exchange-reducer';
import exchangesSession from './exchange-session';
import pockets from './pockets/pocket-reducer';
import rates from './rates/rate-reducer';
import { done, error } from './status/status-actions';

export const reducer = combineReducers({
  converter,
  exchanges,
  exchangesSession,
  pockets,
  rates,
});

export function createStatusMiddleware() {
  return (store: any) => (next: any) => (action: any) => {
    next(action);

    if (!action.type) return;

    if (action.type.endsWith('Success')) store.dispatch(done(action.type));
    else if (action.type.endsWith('Error')) store.dispatch(error(action.type));
  };
}

export default function createStore() {
  let middleware = [...getDefaultMiddleware(), createStatusMiddleware()];
  if (process.env.NODE_ENV !== 'production')
    middleware = [...middleware, logger];

  return configureStore({
    reducer,
    middleware,
  });
}

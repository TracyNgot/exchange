import React from 'react';
import configureStore from 'redux-mock-store';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { makeInitialState, mockFn } from '../test/helpers';
import Routes from '../routes';

jest.mock('../store/pockets/pocket-actions', () => ({
  getPockets: (...args: any[]) => mockFn('getPockets', args),
}));

describe('Routes', () => {
  function renderRoutes(location = '/', initialState = makeInitialState()) {
    const store = configureStore()(initialState);
    const context: StaticRouterContext = {};
    const result = render(
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <Routes />
        </StaticRouter>
      </Provider>,
    );

    return { result, store, context };
  }

  it('redirects to default page', () => {
    const { context } = renderRoutes('/not-found');
    expect(context.url).toBe('/');
  });
});

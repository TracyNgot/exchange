import React from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { cloneDeep } from 'lodash';

import { State } from '../store';
import converter from '../store/converter/converter-reducer';
import exchanges from '../store/exchanges/exchange-reducer';
import exchangesSession from '../store/exchange-session';
import pockets from '../store/pockets/pocket-reducer';
import rates from '../store/rates/rate-reducer';

export function axiosResponse(data: any): AxiosResponse {
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };
}

export function axiosError(error: any): AxiosError {
  return {
    config: {},
    name: 'Test Axios Error',
    message: 'Test Axios Error',
    response: axiosResponse({ error }),
    isAxiosError: true,
    toJSON: () => ({}),
  };
}

export function makeInitialState(): Partial<State> {
  return cloneDeep({
    converter: converter(undefined, { type: null }),
    exchanges: exchanges(undefined, { type: null }),
    exchangesSession: exchangesSession(undefined, { type: null }),
    pockets: pockets(undefined, { type: null }),
    rates: rates(undefined, { type: null }),
  });
}

export function mockFn(type: string, expectedArgs?: any[]) {
  const innerFn = (...args: any[]) => ({ type, args });

  return typeof expectedArgs !== 'undefined'
    ? innerFn(...expectedArgs)
    : innerFn;
}

export const MockCarousel: React.FC = ({ children, afterChange }: any) => (
  <div data-testid="mock-carousel">
    {children.map((child, index) => (
      <div key={`carousel-${index}`}>
        {child}
        <button
          type="button"
          data-testid={`slide-${index}-change`}
          onClick={() => afterChange(index)}
        >
          Slide
        </button>
      </div>
    ))}
  </div>
);

export const MockModal: React.FC = ({
  children,
  visible,
  onCancel,
  footer,
}: any) => (
  <div data-testid="mock-modal">
    {visible ? children : null}
    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <button type="button" data-testid="mock-cancel" onClick={onCancel} />
    {footer}
  </div>
);

export const MockInputNumber: React.FC = ({ onChange }: any) => (
  <input data-testid="input-number" onChange={e => onChange(e.target.value)} />
);

export const MockSelect: React.FC = ({
  onChange,
  filterOption,
  children: options,
  name,
  ...rest
}: any) => {
  const testId = rest['data-testid'];

  function handleChange(e: any) {
    const { value } = e.target;
    onChange(value);
  }

  function handleClick() {
    filterOption('test-input', { props: { children: 'test' } });
  }

  return (
    <div>
      <select onChange={handleChange} name={name} data-testid={testId}>
        {(options || []).map(({ props }: any, idx: number) => {
          const { children, ...optProps } = props;
          return (
            <option key={idx} {...optProps} onClick={handleChange}>
              {children || optProps.value}
            </option>
          );
        })}
      </select>
      <input onClick={handleClick} data-testid="mock-select-filter" />
    </div>
  );
};

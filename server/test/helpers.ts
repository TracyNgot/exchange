export function mockFn(type: string, expectedArgs?: any[]) {
  const innerFn = (...args: any[]) => ({ type, args });

  return typeof expectedArgs !== 'undefined'
    ? innerFn(...expectedArgs)
    : innerFn;
}

export class MockResponse {
  status(...args: any[]) {
    mockFn('status', args);
    return this;
  }
  json(...args: any[]) {
    mockFn('json', args);
    return this;
  }
}

export const mockRequest: any = mock => ({
  body: {},
  params: {},
  query: {},
  ...mock,
});

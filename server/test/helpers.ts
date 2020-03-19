export function mockFn(type: string, expectedArgs?: any[]) {
  const innerFn = (...args: any[]) => ({ type, args });

  return typeof expectedArgs !== 'undefined'
    ? innerFn(...expectedArgs)
    : innerFn;
}

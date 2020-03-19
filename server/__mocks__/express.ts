import { mockFn } from '../test';

const module = () => ({
  use: (...args: any[]) => mockFn('use', args),
  listen: (...args: any[]) => mockFn('listen', args),
  get: (...args: any[]) => mockFn('get', args),
  post: (...args: any[]) => mockFn('post', args),
  delete: (...args: any[]) => mockFn('delete', args),
});

export default module;

import axios from 'axios';
import { mocked } from 'ts-jest/utils';

import { HttpService } from '../http-service';
import { axiosResponse } from '../../test/helpers';

const mockedAxios: any = mocked(axios);

jest.mock('axios');

describe('HttpService', () => {
  const http = new HttpService();

  beforeEach(() => {
    ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].forEach(method => {
      mockedAxios[method.toLowerCase()].mockResolvedValue(
        axiosResponse(`axios ${method}`),
      );
    });
  });

  it('GET calls axios', async () => {
    const res = await http.get('something');
    expect(res.data).toBe('axios GET');
  });

  it('POST calls axios', async () => {
    const res = await http.post('testing', { userId: '989jkwe' });
    expect(res.data).toBe('axios POST');
  });

  it('PATCH calls axios', async () => {
    const res = await http.patch('users/123', { password: 'Secret!' });
    expect(res.data).toBe('axios PATCH');
  });

  it('PUT calls axios', async () => {
    const res = await http.put('users/123', { password: 'Secret!' });
    expect(res.data).toBe('axios PUT');
  });

  it('DELETE calls axios', async () => {
    const res = await http.delete('brands/3008390');
    expect(res.data).toBe('axios DELETE');
  });

  it('sets the Content-Type', async () => {
    const mockedRequestInterceptor = mocked(mockedAxios.interceptors.request);
    const interceptor = mockedRequestInterceptor.use.mock.calls[0][0];

    const firstConfig = await interceptor({});
    expect(firstConfig.headers['Content-Type']).toBe('application/json');
  });
  it('ejects interceptors', async () => {
    const mockedRequestInterceptor = mocked(mockedAxios.interceptors.request);
    http.addRequestInterceptor()();

    expect(mockedRequestInterceptor.eject).toBeCalledTimes(1);
  });
});

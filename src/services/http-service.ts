import axios, { AxiosRequestConfig } from 'axios';

import { BASE_API } from '../config';

type requestInterceptorArgs = Parameters<typeof axios.interceptors.request.use>;

export class HttpService {
  private baseUrl: string = BASE_API;

  constructor() {
    this.addRequestInterceptor(req => {
      req.headers = {
        ...req.headers,
        'Content-Type': 'application/json',
      };

      return req;
    });
  }

  addRequestInterceptor(...args: requestInterceptorArgs) {
    const interceptor = axios.interceptors.request.use(...args);
    return () => axios.interceptors.request.eject(interceptor);
  }

  get(url: string, options: AxiosRequestConfig = {}) {
    return axios.get(`${this.baseUrl}${url}`, options);
  }

  post(url: string, data: any, options: AxiosRequestConfig = {}) {
    return axios.post(`${this.baseUrl}${url}`, data, options);
  }

  put(url: string, data: any, options: AxiosRequestConfig = {}) {
    return axios.put(`${this.baseUrl}${url}`, data, options);
  }

  patch(url: string, data: any, options: AxiosRequestConfig = {}) {
    return axios.patch(`${this.baseUrl}${url}`, data, options);
  }

  delete(url: string) {
    return axios.delete(`${this.baseUrl}${url}`);
  }
}

export default new HttpService();

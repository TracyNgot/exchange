import { Client } from 'faunadb';

import { MockResponse } from '../../test';
import Rate from '../rate';

describe('Rate', () => {
  const response: any = new MockResponse();
  const spyOnQuery = jest.spyOn(Client.prototype, 'query');
  const spyOnResponse = jest.spyOn(response, 'json');
  const spyOnStatus = jest.spyOn(response, 'status');

  beforeEach(() => {
    spyOnQuery.mockClear();
    spyOnResponse.mockClear();
    spyOnStatus.mockClear();
  });

  describe('getRates', () => {
    it('gets rates', async () => {
      spyOnQuery.mockResolvedValue({ id: 'test-collection' });

      await Rate.getRates({} as any, response);
      expect(spyOnResponse).toBeCalledWith({ id: 'test-collection' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Rate.getRates({} as any, response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });

  describe('createRate', () => {
    const body = { from: 'EUR', to: 'GBP', created: '2019-12-12' };

    it('add a new rate', async () => {
      spyOnQuery.mockResolvedValue({ id: 'new-currency' });

      await Rate.createRate({ body } as any, response);
      expect(spyOnResponse).toBeCalledWith({ id: 'new-currency' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Rate.createRate({ body } as any, response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
    it('throws error if missing property', async () => {
      await Rate.createRate({ body: {} } as any, response);
      expect(spyOnResponse).toBeCalledWith(new Error('Missing from'));
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });

  describe('deleteRate', () => {
    it('delete existing rate', async () => {
      spyOnQuery.mockResolvedValue({ id: '12345' });

      await Rate.deleteRate({ params: { id: '12345' } } as any, response);
      expect(spyOnResponse).toBeCalledWith({ id: '12345' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Rate.deleteRate({ params: { id: 'not-found' } } as any, response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
    it('throws error if id not defined', async () => {
      await Rate.deleteRate({ params: {} } as any, response);
      expect(spyOnResponse).toBeCalledWith(new Error('Missing id'));
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });
});

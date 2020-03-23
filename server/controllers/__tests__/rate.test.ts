import { Client } from 'faunadb';

import { mockRequest, MockResponse } from '../../test';
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

      await Rate.getRates(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith({ id: 'test-collection' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Rate.getRates(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });

  describe('createRate', () => {
    const body = { from: 'EUR', to: 'GBP' };

    it('add a new rate', async () => {
      spyOnQuery.mockResolvedValue({ id: 'new-currency' });

      await Rate.createRate(mockRequest({ body }), response);
      expect(spyOnResponse).toBeCalledWith({ id: 'new-currency' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Rate.createRate(mockRequest({ body }), response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
    it('throws error if missing property', async () => {
      await Rate.createRate(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith(
        new Error('error.missing.property.from'),
      );
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });

  describe('deleteRate', () => {
    it('delete existing rate', async () => {
      spyOnQuery.mockResolvedValue({ id: '12345' });

      await Rate.deleteRate(mockRequest({ params: { id: '12345' } }), response);
      expect(spyOnResponse).toBeCalledWith({ id: '12345' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Rate.deleteRate(
        mockRequest({ params: { id: 'not-found' } }),
        response,
      );
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
    it('throws error if id not defined', async () => {
      await Rate.deleteRate(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith(
        new Error('error.missing.property.id'),
      );
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });
});

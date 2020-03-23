import { Client } from 'faunadb';

import Exchange from '../exchange';
import { MockResponse, mockRequest } from '../../test';

describe('Exchange', () => {
  const response: any = new MockResponse();
  const spyOnQuery = jest.spyOn(Client.prototype, 'query');
  const spyOnResponse = jest.spyOn(response, 'json');
  const spyOnStatus = jest.spyOn(response, 'status');

  beforeEach(() => {
    spyOnQuery.mockClear();
    spyOnResponse.mockClear();
    spyOnStatus.mockClear();
  });

  describe('getExchanges', () => {
    it('gets exchanges', async () => {
      spyOnQuery.mockResolvedValue({ id: 'test-collection' });

      await Exchange.getExchangesByPocket(
        mockRequest({ params: { pocketId: 'pocket-id' } }),
        response,
      );
      expect(spyOnResponse).toBeCalledWith({ id: 'test-collection' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Exchange.getExchangesByPocket(
        mockRequest({ params: { pocketId: 'pocket-id' } }),
        response,
      );
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });

  describe('createExchange', () => {
    const body = {
      from: 'EUR',
      to: 'GBP',
      amount: 120.6,
      rate: 0.8,
    };

    it('create a new exchange', async () => {
      spyOnQuery.mockResolvedValueOnce({ id: '1234' });
      spyOnQuery.mockResolvedValueOnce({ data: { amount: 1000 } });
      spyOnQuery.mockResolvedValueOnce({ data: { amount: 2000 } });
      spyOnQuery.mockResolvedValueOnce('success update EUR pocket');
      spyOnQuery.mockResolvedValueOnce('success update GBP pocket');

      await Exchange.createExchange(mockRequest({ body }), response);
      expect(spyOnResponse).toBeCalledTimes(1);
      expect(spyOnStatus).toBeCalledWith(201);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Exchange.createExchange(mockRequest({ body }), response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
    it('throws error if missing property', async () => {
      await Exchange.createExchange(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith(
        new Error('error.missing.property.from'),
      );
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });
});

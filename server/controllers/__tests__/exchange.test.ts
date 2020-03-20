import { Client } from 'faunadb';

import Exchange from '../exchange';
import { MockResponse } from '../../test';

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

      await Exchange.getExchanges({} as any, response);
      expect(spyOnResponse).toBeCalledWith({ id: 'test-collection' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Exchange.getExchanges({} as any, response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });

  describe('createExchange', () => {
    const body = {
      from: 'EUR',
      to: 'GBP',
      created: '2019-12-12',
      amount: 120.6,
      pocketId: 'test',
    };

    it('create a new exchange', async () => {
      spyOnQuery.mockResolvedValue({ id: '1234' });

      await Exchange.createExchange({ body } as any, response);
      expect(spyOnResponse).toBeCalledWith({ id: '1234' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Exchange.createExchange({ body } as any, response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
    it('throws error if missing property', async () => {
      await Exchange.createExchange({ body: {} } as any, response);
      expect(spyOnResponse).toBeCalledWith(new Error('Missing from'));
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });
});

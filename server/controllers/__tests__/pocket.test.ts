import { Client } from 'faunadb';

import Pocket from '../pocket';
import { mockRequest, MockResponse } from '../../test';

describe('Pocket', () => {
  const response: any = new MockResponse();
  const spyOnQuery = jest.spyOn(Client.prototype, 'query');
  const spyOnResponse = jest.spyOn(response, 'json');
  const spyOnStatus = jest.spyOn(response, 'status');

  beforeEach(() => {
    spyOnQuery.mockClear();
    spyOnResponse.mockClear();
    spyOnStatus.mockClear();
  });

  describe('getPockets', () => {
    it('gets pockets', async () => {
      spyOnQuery.mockResolvedValue({ id: 'test-collection' });

      await Pocket.getPockets(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith({ id: 'test-collection' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Pocket.getPockets(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });

  describe('getPocket', () => {
    it('gets existing pocket', async () => {
      spyOnQuery.mockResolvedValue({ id: '1234' });

      await Pocket.getPocket(mockRequest({ params: { id: '1234' } }), response);
      expect(spyOnResponse).toBeCalledWith({ id: '1234' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Pocket.getPocket(mockRequest({ params: { id: '1234' } }), response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
    it('throws error if id not defined', async () => {
      await Pocket.getPocket(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith(
        new Error('error.missing.property.id'),
      );
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });

  describe('createPocket', () => {
    it('creates a pocket', async () => {
      spyOnQuery.mockResolvedValue({ id: 'new-pocket' });

      await Pocket.createPocket(
        mockRequest({ body: { currency: 'GBP' } }),
        response,
      );
      expect(spyOnResponse).toBeCalledWith({ id: 'new-pocket' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Pocket.createPocket(
        mockRequest({ body: { currency: 'GBP' } }),
        response,
      );
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
    it('throws error if currency not defined', async () => {
      await Pocket.createPocket(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith(
        new Error('error.missing.property.currency'),
      );
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });
});

import { Client } from 'faunadb';
import { MockResponse, mockRequest } from '../../test';
import Converter from '../converter';

describe('Converter', () => {
  const response: any = new MockResponse();
  const spyOnQuery = jest.spyOn(Client.prototype, 'query');
  const spyOnResponse = jest.spyOn(response, 'json');
  const spyOnStatus = jest.spyOn(response, 'status');

  beforeEach(() => {
    spyOnQuery.mockClear();
    spyOnResponse.mockClear();
    spyOnStatus.mockClear();
  });

  describe('getConverter', () => {
    it('gets the converter', async () => {
      spyOnQuery.mockResolvedValue({ id: 'test-collection' });

      await Converter.getConverter(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith({ id: 'test-collection' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Converter.getConverter(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });

  describe('addCurrency', () => {
    it('add a new currency', async () => {
      spyOnQuery.mockResolvedValue({ id: 'new-currency' });

      await Converter.addCurrency(
        mockRequest({ body: { currency: 'GBP' } }),
        response,
      );
      expect(spyOnResponse).toBeCalledWith({ id: 'new-currency' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Converter.addCurrency(
        mockRequest({ body: { currency: 'GBP' } }),
        response,
      );
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
    it('throws error if currency not defined', async () => {
      await Converter.addCurrency(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith(
        new Error('error.missing.property.currency'),
      );
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });

  describe('deleteCurrency', () => {
    it('delete existing currency', async () => {
      spyOnQuery.mockResolvedValue({ id: '12345' });

      await Converter.deleteCurrency(
        mockRequest({ params: { id: '12345' } }),
        response,
      );
      expect(spyOnResponse).toBeCalledWith({ id: '12345' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Converter.deleteCurrency(
        mockRequest({ params: { id: 'not-found' } }),
        response,
      );
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
    it('throws error if id not defined', async () => {
      await Converter.deleteCurrency(mockRequest(), response);
      expect(spyOnResponse).toBeCalledWith(
        new Error('error.missing.property.id'),
      );
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });
});

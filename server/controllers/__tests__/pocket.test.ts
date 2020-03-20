import { Client } from 'faunadb';

import Pocket from '../pocket';
import { MockResponse } from '../../test';

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

      await Pocket.getPockets({} as any, response);
      expect(spyOnResponse).toBeCalledWith({ id: 'test-collection' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Pocket.getPockets({} as any, response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });

  describe('getPocket', () => {
    it('gets existing pocket', async () => {
      spyOnQuery.mockResolvedValue({ id: '1234' });

      await Pocket.getPocket({ params: { id: '1234' } } as any, response);
      expect(spyOnResponse).toBeCalledWith({ id: '1234' });
      expect(spyOnStatus).toBeCalledWith(200);
    });
    it('throws error', async () => {
      spyOnQuery.mockRejectedValue({ error: 'error' });

      await Pocket.getPocket({ params: { id: '1234' } } as any, response);
      expect(spyOnResponse).toBeCalledWith({ error: 'error' });
      expect(spyOnStatus).toBeCalledWith(400);
    });
    it('throws error if id not defined', async () => {
      await Pocket.getPocket({ params: {} } as any, response);
      expect(spyOnResponse).toBeCalledWith(new Error('Missing id'));
      expect(spyOnStatus).toBeCalledWith(400);
    });
  });
});

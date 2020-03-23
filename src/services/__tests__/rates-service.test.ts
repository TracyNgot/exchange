import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import { latestRatesResponse } from '../../test/mocks';
import ratesService from '../rates-service';

const mockedAxios: any = mocked(axios);

describe('RatesService', () => {
  test('getLatestRates', async () => {
    mockedAxios.get.mockResolvedValue(latestRatesResponse);

    const response = await ratesService.getLatestRates('EUR');

    expect(mockedAxios.get).toBeCalledWith(
      'https://api.exchangeratesapi.io/latest',
      {
        params: { base: 'EUR' },
      },
    );
    expect(response).toBe(latestRatesResponse);
  });
});

import axios from 'axios';

export class RatesService {
  public getLatestRates(base?: string) {
    return axios.get(`https://api.exchangeratesapi.io/latest`, {
      params: { base },
    });
  }
}

export default new RatesService();

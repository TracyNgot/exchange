import http from '../../services/http-service';
import { Rate } from './rate-reducer';

class RateApiService {
  public getSavedRates(after?: any) {
    return http.get('rates', { params: { after: JSON.stringify(after) } });
  }
  public saveRate(rate: Pick<Rate, 'from' | 'to'>) {
    return http.post('rates', rate);
  }
  public deleteRate(rateId: string) {
    return http.delete(`rates/${rateId}`);
  }
}

export default new RateApiService();
